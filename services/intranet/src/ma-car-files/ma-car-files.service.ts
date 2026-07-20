import { Injectable } from '@nestjs/common';
import { MaCarFilesRepository } from '@inventory/share';
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
          name: file.originalname,
          fileName: objectKey.split('/').pop(),
          filePath: objectKey,
          fileType: ext,
        } as Prisma.maCarFilesCreateInput,
      });
      results.push(created);
    }
    return results;
  }

  findAll() {
    return this.MaCarFilesRepo.findAll();
  }

  findOne(id: number) {
    return this.MaCarFilesRepo.findOne({ where: { id } });
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
    return this.MaCarFilesRepo.delete({ where: { id } });
  }
}
