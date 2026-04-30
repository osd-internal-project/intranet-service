import { Injectable, NotFoundException } from '@nestjs/common';
import { masterRestaurantRepository } from '@inventory/share';

import { Prisma } from '@prisma/client';
import appConfig from '../configs';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { v4 as uuidv4 } from 'uuid';
const config = appConfig();
import * as path from 'path';

@Injectable()
export class MasterRestaurantService {
  constructor(
    private readonly masterrestautantRepo: masterRestaurantRepository,
    private readonly minioService: MinioClientService,
  ) {}
  async create(createMasterRestaurantDto: any, attendFiles: any) {
    const { files, ...condition } = createMasterRestaurantDto || {};
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
    const newData = new Map();
    for (const item of response) {
      const url = item.pathFIles
        ? await this.minioService.getPresignedUrl(
            config.minioBucketRes,
            item.pathFIles,
          )
        : null;
      newData.set(item.id, {
        ...item,
        fileUrl: url,
      });
    }
    const count = await this.masterrestautantRepo.count({ where });
    return { data: Array.from(newData.values()), count };
  }

  findOne(id: number) {
    return this.masterrestautantRepo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMasterRestaurantDto: any, attendFiles: any) {
    const { files, contact, menu, ...condition } =
      updateMasterRestaurantDto || {};
    const file = attendFiles[0];
    let objectName = '';
    const data = await this.masterrestautantRepo.findOne({
      where: { id },
    });
    if (data.pathFIles && file) {
      await this.minioService.deleteFile(data.pathFIles, config.minioBucketRes);
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

    return this.masterrestautantRepo.update({
      where: {
        id,
      },
      data: {
        ...condition,
        contact: contact ? contact : [],
        menu: menu ? menu : [],
        pathFIles: objectName ? objectName : data.pathFIles,
      },
    });
  }

  async remove(id: number) {
    const data = await this.masterrestautantRepo.findOne({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    if (data.pathFIles) {
      await this.minioService.deleteFile(data.pathFIles, config.minioBucketRes);
    }
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
