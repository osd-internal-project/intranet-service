import { Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import appConfig from 'src/configs';
const config = appConfig();

type FileStat = {
  size: number;
  etag: string;
  contentType?: string;
};

@Injectable()
export class MinioClientService {
  constructor(private readonly minio: MinioService) {}
  private get minioClient() {
    return this.minio.client;
  }

  public async uploadFile(
    file: Buffer,
    size: number,
    baseBucket: string,
    path: string,
  ): Promise<unknown> {
    return this.minioClient.putObject(baseBucket, path, file, size);
  }
  async deleteFile(objetName: string, baseBucket: string) {
    return await this.minioClient.removeObject(baseBucket, objetName);
  }

  public async downloadFile(bucket: string, fileName: string) {
    Logger.debug(`Bucket : ${bucket}`);
    Logger.debug(`Path : ${fileName}`);
    const res = await this.minioClient.getObject(bucket, fileName);
    return res;
  }

  public async statFile(
    bucket: string,
    fileName: string,
  ): Promise<FileStat | null> {
    try {
      const stat = await this.minioClient.statObject(bucket, fileName);
      return stat; // stat.metaData['content-type'] สามารถใช้ได้
    } catch (err) {
      console.error('MinIO statObject error:', err);
      return null; // ถ้าไม่มีไฟล์
    }
  }

  async getPresignedUrl(bucket: string, filename: string): Promise<string> {
    const storagePath = config.storagePath;
    const storageUrl = new URL(storagePath);
    const url = await this.minioClient.presignedGetObject(
      bucket,
      filename,
      24 * 60 * 60,
    );
    const urlObj = new URL(url);

    urlObj.protocol = storageUrl.protocol;
    urlObj.hostname = storageUrl.hostname;
    urlObj.port = storageUrl.port;

    const basePath = storageUrl.pathname.replace(/\/$/, '');
    const objectPath = urlObj.pathname.replace(/^\//, '');

    urlObj.pathname = `${basePath}/${objectPath}`;

    return urlObj.toString();
  }
}
