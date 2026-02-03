import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import appConfig from 'src/configs';

const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static');
const config = appConfig();

type FileStat = {
  size: number;
  etag: string;
  contentType?: string;
};

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);
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

  async uploadVideoWithThumbnail(
    bucket: string,
    file: Express.Multer.File,
    id: string,
  ) {
    const videoFileName = `${Date.now()}-${file.originalname}`;
    const thumbnailFileName = `thumb-${Date.now()}.png`;
    const objectName = `${id}/${videoFileName}`;
    const thumbnailObjectName = `${id}/${thumbnailFileName}`;

    // Use os.tmpdir() for better compatibility
    const os = require('os');
    const tempDir = os.tmpdir();
    const tempVideoPath = path.join(tempDir, videoFileName);
    const tempThumbPath = path.join(tempDir, thumbnailFileName);

    // 2. เขียนไฟล์วิดีโอลง Disk ชั่วคราวเพื่อให้ FFmpeg อ่าน
    fs.writeFileSync(tempVideoPath, file.buffer);

    try {
      // 3. สร้าง Thumbnail ด้วย FFmpeg
      await new Promise((resolve, reject) => {
        ffmpeg(tempVideoPath)
          .screenshots({
            count: 1,
            folder: path.dirname(tempThumbPath),
            filename: path.basename(tempThumbPath),
            timemarks: ['20%'], // จับภาพที่ตำแหน่ง 20% ของวิดีโอ
            size: '320x?', // ปรับขนาด (กว้าง 320, สูง auto)
          })
          .on('end', resolve)
          .on('error', reject);
      });

      // 4. Upload Video ขึ้น MinIO (ใช้ putObject แทน fPutObject)
      await this.minioClient.putObject(
        bucket,
        objectName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );

      const thumbBuffer = fs.readFileSync(tempThumbPath);
      await this.minioClient.putObject(
        bucket,
        thumbnailObjectName,
        thumbBuffer,
        thumbBuffer.length,
        {
          'Content-Type': 'image/png',
        },
      );

      // 6. (Optional) สร้าง Presigned URL แบบ Public (ถ้า bucket เป็น public ไม่ต้องใช้ presigned ก็ได้ แต่ code เดิมใช้)
      // const videoUrl = await this.minioClient.presignedGetObject(bucket, objectName, 24 * 60 * 60);
      // const thumbUrl = await this.minioClient.presignedGetObject(bucket, thumbnailObjectName, 24 * 60 * 60);

      return {
        file: objectName,
        thumbnail: thumbnailObjectName,
      };
    } catch (error) {
      console.error('Error in uploadVideoWithThumbnail:', error);
      throw new BadRequestException('Error processing video: ' + error.message);
    } finally {
      try {
        if (fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath);
        if (fs.existsSync(tempThumbPath)) fs.unlinkSync(tempThumbPath);
      } catch (cleanupError) {
        console.error('Error cleaning up temp files:', cleanupError);
      }
    }
  }
}
