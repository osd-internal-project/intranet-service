import { Injectable } from '@nestjs/common';
import {
  MaCarImageRepository,
  CarActivityLogService,
  CarActivityAction,
  decodeUploadFilename,
} from '@inventory/share';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MinioClientService } from '../minio-client/minio-client.service';
import appConfig from '../configs';

const config = appConfig();

export type MaCarImageType = 'profile' | 'gallery';

@Injectable()
export class MaCarImageService {
  constructor(
    private readonly maCarImageRepo: MaCarImageRepository,
    private readonly minioService: MinioClientService,
    private readonly activityLog: CarActivityLogService,
  ) {}

  findByCar(carId: string) {
    return this.maCarImageRepo.findMany({
      where: { carId },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * อัปโหลดรูปรถขึ้น MinIO — key: macar/car/{carId}/{type}/{uuid}{ext}
   * profile มีได้รูปเดียว จึงลบรูป profile เดิม (ทั้ง object และแถว) ก่อน
   */
  async upload(carId: string, type: MaCarImageType, files: Express.Multer.File[]) {
    if (type === 'profile') {
      const olds = await this.maCarImageRepo.findMany({
        where: { carId, type: 'profile' },
      });
      for (const old of olds) {
        await this.minioService.deleteFile(old.filePath, config.minioBucket);
        await this.maCarImageRepo.delete({ where: { id: old.id } });
      }
    }
    const results = [];
    for (const file of files) {
      const ext = extname(file.originalname);
      const objectKey = `macar/car/${carId}/${type}/${uuidv4()}${ext}`;
      await this.minioService.uploadFile(
        file.buffer,
        file.size,
        config.minioBucket,
        objectKey,
      );
      results.push(
        await this.maCarImageRepo.create({
          data: {
            maCar: { connect: { carId } },
            type,
            name: decodeUploadFilename(file.originalname),
            filePath: objectKey,
            fileType: ext,
          },
        }),
      );
    }
    await this.activityLog.log({
      carId,
      action: CarActivityAction.FILE_IMAGE_UPLOAD,
      detail: { type, count: results.length },
    });
    return results;
  }

  /** ลบรูป — ลบ object ออกจาก MinIO ก่อน แล้วค่อยลบแถวใน DB */
  async remove(id: number) {
    const image = await this.maCarImageRepo.findOne({ where: { id } });
    if (!image) return null;
    await this.minioService.deleteFile(image.filePath, config.minioBucket);
    const res = await this.maCarImageRepo.delete({ where: { id } });
    await this.activityLog.log({
      carId: image.carId,
      action: CarActivityAction.FILE_IMAGE_DELETE,
      detail: { type: image.type, fileName: image.name },
    });
    return res;
  }
}
