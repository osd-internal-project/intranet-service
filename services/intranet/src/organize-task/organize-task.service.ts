import { Injectable, NotFoundException } from '@nestjs/common';
import { organizeSubTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { v4 as uuidv4 } from 'uuid';
import appConfig from '../configs';
const config = appConfig();
import * as path from 'path';

@Injectable()
export class OrganizeTaskService {
  constructor(
    private readonly organizesubtaskRepo: organizeSubTaskRepository,
    private readonly minioService: MinioClientService,
  ) {}
  async create(createOrganizeTaskDto: any, files: any) {
    const parsedItems = JSON.parse(createOrganizeTaskDto.record);
    const {
      key,
      name,
      assigned,
      dueDate,
      status,
      remark,
      assignedDate,
      organizedId,
      organizeTaskId,
    } = parsedItems || {};
    const uploadToMinio = async (file: Express.Multer.File) => {
      if (!file) return null;
      try {
        const bucket = config.minioBucketOrganize;
        const uuidName = uuidv4();
        const ext = path.extname(file.originalname);
        const originalName = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        const objectName = `${uuidName}${ext}`;
        await this.minioService.uploadFile(
          file.buffer,
          file.size,
          bucket,
          objectName,
        );

        return { objectName, originalName };
      } catch (error) {
        throw new Error('UPLOAD_FAILED');
      }
    };

    let filePath;
    if (files) {
      filePath = await uploadToMinio(files[0]);
    }

    return await this.organizesubtaskRepo.create({
      data: {
        name,
        status,
        assigned,
        assignedDate,
        dueDate,
        remark,
        organizeManagementTaskId: +organizeTaskId,
        pathFiles: {
          objectName: filePath?.objectName,
          originalName: filePath?.originalName,
        },
        expenses: 0,
      },
    });
  }

  findAll() {
    return this.organizesubtaskRepo.findMany({});
  }

  findMany(condition: Prisma.organizeSubTaskFindManyArgs) {
    return this.organizesubtaskRepo.findMany(condition);
  }

  findOne(id: number) {
    return this.organizesubtaskRepo.findOne({
      where: {
        id,
      },
    });
  }

  async update(createorganizeManagementTaskDto: any, files: any, id: number) {
    const parsedItems = JSON.parse(createorganizeManagementTaskDto.record);
    const { name, assigned, dueDate, status, remark, assignedDate } =
      parsedItems || {};

    const uploadToMinio = async (file: Express.Multer.File) => {
      if (!file) return null;
      const data: any = await this.organizesubtaskRepo.findOne({
        where: { id },
      });
      if (data.pathFiles.objectName) {
        await this.minioService.deleteFile(
          data.pathFiles.objectName,
          config.minioBucketOrganize,
        );
      }
      try {
        const bucket = config.minioBucketOrganize;
        const uuidName = uuidv4();
        const ext = path.extname(file.originalname);
        const originalName = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        const objectName = `${uuidName}${ext}`;
        await this.minioService.uploadFile(
          file.buffer,
          file.size,
          bucket,
          objectName,
        );

        return { objectName, originalName };
      } catch (error) {
        throw new Error('UPLOAD_FAILED');
      }
    };

    let filePath;
    if (files) {
      filePath = await uploadToMinio(files[0]);
    }
    return this.organizesubtaskRepo.update({
      where: { id },
      data: {
        name,
        status,
        assigned,
        assignedDate,
        dueDate,
        remark,
        ...(files?.length > 0 && {
          pathFiles: {
            objectName: filePath?.objectName,
            originalName: filePath?.originalName,
          },
        }),
        expenses: 0,
      },
    });
  }

  async remove(id: number) {
    const data: any = await this.organizesubtaskRepo.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Data not found');
    }

    const file = data.pathFiles as {
      objectName?: string;
      originalName?: string;
    } | null;

    if (file?.objectName) {
      await this.minioService.deleteFile(
        file.objectName,
        config.minioBucketOrganize,
      );
    }
    return this.organizesubtaskRepo.delete({
      where: {
        id,
      },
    });
  }
}
