import { Injectable } from '@nestjs/common';
import {
  MaCarFilesRepository,
  CarActivityLogService,
  CarActivityAction,
  decodeUploadFilename,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MinioClientService } from '../minio-client/minio-client.service';
import appConfig from '../configs';

const config = appConfig();

@Injectable()
export class MaCarFilesService {
  constructor(
    private readonly MaCarFilesRepo: MaCarFilesRepository,
    private readonly minioService: MinioClientService,
    private readonly activityLog: CarActivityLogService,
  ) {}
  async create(createMaCarFileDto: Prisma.maCarFilesCreateInput) {
    return await this.MaCarFilesRepo.create({
      data: createMaCarFileDto,
    });
  }

  /**
   * อัปโหลดไฟล์แนบของรถขึ้น MinIO — key: macar/car/{carId}/detail/{uuid}{ext}
   * เก็บ object key ที่ filePath, ชื่อเดิมที่ name (ไว้แสดง/ตั้งชื่อตอนดาวน์โหลด)
   */
  async uploadFiles(carId: string, files: Express.Multer.File[]) {
    const results = [];
    for (const file of files) {
      const ext = extname(file.originalname);
      const originalName = decodeUploadFilename(file.originalname);
      const objectKey = `macar/car/${carId}/detail/${uuidv4()}${ext}`;
      await this.minioService.uploadFile(
        file.buffer,
        file.size,
        config.minioBucket,
        objectKey,
      );
      const created = await this.MaCarFilesRepo.create({
        data: {
          carId,
          name: originalName,
          fileName: objectKey.split('/').pop(),
          filePath: objectKey,
          fileType: ext,
        } as Prisma.maCarFilesCreateInput,
      });
      results.push(created);
    }
    if (carId && results.length) {
      await this.activityLog.log({
        carId,
        action: CarActivityAction.FILE_CAR_UPLOAD,
        detail: { count: results.length },
      });
    }
    return results;
  }

  findAll() {
    return this.MaCarFilesRepo.findAll();
  }

  findOne(id: number) {
    return this.MaCarFilesRepo.findOne({ where: { id } });
  }
  findByCar(carId: string) {
    return this.MaCarFilesRepo.findMany({ where: { carId } });
  }
  async update(id: number, updateMaCarFileDto: Prisma.maCarFilesUpdateInput) {
    return await this.MaCarFilesRepo.update({
      where: { id },
      data: updateMaCarFileDto,
    });
  }

  /** ลบไฟล์ — ลบ object ออกจาก MinIO ก่อน แล้วค่อยลบแถวใน DB */
  async remove(id: number) {
    const file = await this.MaCarFilesRepo.findOne({ where: { id } });
    if (file?.filePath) {
      await this.minioService.deleteFile(file.filePath, config.minioBucket);
    }
    const res = await this.MaCarFilesRepo.delete({ where: { id } });
    if (file?.carId) {
      await this.activityLog.log({
        carId: file.carId,
        action: CarActivityAction.FILE_CAR_DELETE,
        detail: { fileName: file.name },
      });
    }
    return res;
  }
}
