import { Injectable } from '@nestjs/common';
import { masterRestaurantRepository } from '@inventory/share';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import appConfig from '../configs';
import { MinioClientService } from 'src/minio-client/minio-client.service';
const config = appConfig();
import * as path from 'path';

@Injectable()
export class MasterRestaurantService {
  constructor(
    private readonly masterrestautantRepo: masterRestaurantRepository,
    private readonly minioService: MinioClientService,
  ) {}
  async create(createMasterRestaurantDto: any, attendFiles: any) {
    const { files, pricing, ...condition } = createMasterRestaurantDto || {};
    const file = attendFiles[0];
    let objectName = '';
    if (file) {
      const uuidName = uuidv4();
      const ext = path.extname(file.originalname); // ✅ ถูกต้อง
      objectName = `${uuidName}${ext}`;
      await this.minioService.uploadFile(
        file.buffer,
        file.size,
        config.minioBucketRes,
        objectName,
      );
    }

    const base = {
      ...condition,
      pricing: +pricing,
      pathFIles: `${objectName}`,
    };
    return this.masterrestautantRepo.create({
      data: base,
    });
  }

  findAll() {
    return this.masterrestautantRepo.findMany({});
  }

  async findMany(conditions: Prisma.masterRestaurantFindManyArgs) {
    const { take, skip, where } = conditions || {};
    const response = await this.masterrestautantRepo.findMany({
      where,
      take,
      skip,
      orderBy: {
        id: 'asc',
      },
    });
    const count = await this.masterrestautantRepo.count({ where });
    return { data: response, count };
  }

  findOne(id: number) {
    return this.masterrestautantRepo.findOne({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    updateMasterRestaurantDto: Prisma.masterRestaurantUpdateInput,
  ) {
    return this.masterrestautantRepo.update({
      where: {
        id,
      },
      data: updateMasterRestaurantDto,
    });
  }

  remove(id: number) {
    return this.masterrestautantRepo.delete({
      where: {
        id,
      },
    });
  }

  async getFile(bucket: string, objectName: string) {
    return this.minioService.downloadFile(bucket, objectName);
  }
}
