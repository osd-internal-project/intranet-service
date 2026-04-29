import { Injectable } from '@nestjs/common';
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
    console.log('files', files);
    const parsedItems = JSON.parse(createOrganizeTaskDto.record);
    console.log('record', parsedItems);
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
          objectName: filePath ?? filePath?.objectName,
          originalName: filePath ?? filePath?.originalName,
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

  update(id: number, updateOrganizeTaskDto: Prisma.organizeSubTaskUpdateInput) {
    return this.organizesubtaskRepo.update({
      where: {
        id,
      },
      data: updateOrganizeTaskDto,
    });
  }

  remove(id: number) {
    return this.organizesubtaskRepo.delete({
      where: {
        id,
      },
    });
  }
}
