import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaCarBookingImageDto } from './dto/create-ma-car-booking-image.dto';
import { UpdateMaCarBookingImageDto } from './dto/update-ma-car-booking-image.dto';
import {
  MaCarBookRepository,
  MaCarBookingImageRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MinioClientService } from '../minio-client/minio-client.service';
import appConfig from '../configs';

const config = appConfig();

@Injectable()
export class MaCarBookingImagesService {
  constructor(
    private readonly macarbookinimagesRepo: MaCarBookingImageRepository,
    private readonly maCarBookRepo: MaCarBookRepository,
    private readonly minioService: MinioClientService,
  ) {}
  create(createMaCarBookingImageDto: CreateMaCarBookingImageDto) {
    const base = { data: createMaCarBookingImageDto };
    return this.macarbookinimagesRepo.create(base);
  }

  /**
   * อัปโหลดรูปการรับ-คืนรถขึ้น MinIO — key: macar/car/{carId}/booking/{uuid}{ext}
   * เก็บ object key ที่ filePath, ชื่อไฟล์เดิมที่ fileName
   * @param bookId รหัสการจอง (carBookingId)
   * @param file ไฟล์ (memory storage)
   */
  async uploadImage(bookId: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is undefined');
    }
    const booking = await this.maCarBookRepo.findOne({
      where: { id: bookId },
    });
    const carId = booking?.carId ?? 'unknown';
    const ext = extname(file.originalname);
    const objectKey = `macar/car/${carId}/booking/${uuidv4()}${ext}`;
    await this.minioService.uploadFile(
      file.buffer,
      file.size,
      config.minioBucket,
      objectKey,
    );
    const data = {
      carBookingId: bookId,
      filePath: objectKey,
      fileName: file.originalname,
      fileType: file.mimetype,
    } as Prisma.maCarBookImageCreateInput;
    return this.macarbookinimagesRepo.create({ data });
  }

  findAll() {
    return this.macarbookinimagesRepo.findAll();
  }

  findOne(idCarBookImage: number) {
    return this.macarbookinimagesRepo.findOne({
      where: {
        idCarBookImage: idCarBookImage,
      },
    });
  }

  update(id: number, updateMaCarBookingImageDto: UpdateMaCarBookingImageDto) {
    return this.macarbookinimagesRepo.update({
      where: { idCarBookImage: id },
      data: updateMaCarBookingImageDto,
    });
  }

  /** ลบรูป — ลบ object ออกจาก MinIO ก่อน แล้วค่อยลบแถวใน DB */
  async remove(id: number) {
    const image = await this.macarbookinimagesRepo.findOne({
      where: { idCarBookImage: id },
    });
    if (image?.filePath && image.filePath.startsWith('macar/')) {
      await this.minioService.deleteFile(image.filePath, config.minioBucket);
    }
    return this.macarbookinimagesRepo.delete({
      where: { idCarBookImage: id },
    });
  }
}
