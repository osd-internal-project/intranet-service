import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MaCarWrapupImageRepository,
  MaCarWrapupRepository,
  CarActivityLogService,
  CarActivityAction,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MinioClientService } from '../minio-client/minio-client.service';
import appConfig from '../configs';

const config = appConfig();

@Injectable()
export class maCarWrapupImageService {
  constructor(
    private readonly maCarWrapupImageNewsRepo: MaCarWrapupImageRepository,
    private readonly maCarWrapupRepo: MaCarWrapupRepository,
    private readonly minioService: MinioClientService,
    private readonly activityLog: CarActivityLogService,
  ) {}

  /**
   * อัปโหลดรูปตรวจสภาพขึ้น MinIO แล้วบันทึกลง DB
   * - เก็บ object key (uuid) ไว้ที่ filePath ส่วน fileName เก็บชื่อไฟล์เดิมไว้แสดงผล
   * - จัด key เป็น "โฟลเดอร์" ตามรถ: macar/car/{carId}/ma/{uuid}{ext}
   * @param carWrapupId รหัสรายการตรวจสภาพ
   * @param file ไฟล์ที่อัปโหลด (memory storage — ต้องมี buffer/size)
   */
  async uploadImage(carWrapupId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is undefined');
    }
    const wrapup = await this.maCarWrapupRepo.findOne({
      where: { carWrapupId },
    });
    const carId = wrapup?.carId ?? 'unknown';
    const ext = extname(file.originalname);
    const objectKey = `macar/car/${carId}/ma/${uuidv4()}${ext}`;
    await this.minioService.uploadFile(
      file.buffer,
      file.size,
      config.minioBucket,
      objectKey,
    );
    const data = {
      carWrapupId: carWrapupId,
      fileName: file.originalname,
      filePath: objectKey,
      fileType: ext,
    } as Prisma.maCarWrapupImageCreateInput;
    const created = await this.maCarWrapupImageNewsRepo.create({ data });
    if (wrapup?.carId) {
      await this.activityLog.log({
        carId: wrapup.carId,
        carName: wrapup.carName ?? undefined,
        action: CarActivityAction.FILE_WRAPUP_UPLOAD,
        refId: carWrapupId,
        detail: { fileName: file.originalname },
      });
    }
    return created;
  }

  create(data: Prisma.maCarWrapupImageCreateArgs) {
    return this.maCarWrapupImageNewsRepo.create(data);
  }

  findAll(condition: Prisma.maCarWrapupImageFindManyArgs) {
    return this.maCarWrapupImageNewsRepo.findMany({
      ...condition,
      orderBy: {
        idwarpupImage: 'asc',
      },
    });
  }

  findOne(idwarpupImage: number) {
    const base = {
      where: {
        idwarpupImage: idwarpupImage,
      },
    };

    return this.maCarWrapupImageNewsRepo.findOne(base);
  }

  /**
   * ลบรูป — ลบ object ออกจาก MinIO ก่อน แล้วค่อยลบแถวใน DB
   * @param idwarpupImage รหัสรูป
   */
  async remove(idwarpupImage: number) {
    const image = await this.maCarWrapupImageNewsRepo.findOne({
      where: { idwarpupImage },
    });
    if (image?.filePath) {
      await this.minioService.deleteFile(image.filePath, config.minioBucket);
    }
    const res = await this.maCarWrapupImageNewsRepo.delete({
      where: { idwarpupImage },
    });
    const wrapup = image?.carWrapupId
      ? await this.maCarWrapupRepo.findOne({
          where: { carWrapupId: image.carWrapupId },
        })
      : null;
    if (wrapup?.carId) {
      await this.activityLog.log({
        carId: wrapup.carId,
        carName: wrapup.carName ?? undefined,
        action: CarActivityAction.FILE_WRAPUP_DELETE,
        refId: image?.carWrapupId,
        detail: { fileName: image?.fileName },
      });
    }
    return res;
  }
}
