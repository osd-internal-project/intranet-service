import { Injectable } from '@nestjs/common';
import { organizeManagementTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { v4 as uuidv4 } from 'uuid';
import appConfig from '../configs';
const config = appConfig();
import * as path from 'path';

@Injectable()
export class organizeManagementTaskService {
  constructor(
    private readonly organizeManagementtaskRepo: organizeManagementTaskRepository,
    private readonly minioService: MinioClientService,
  ) {}
  async create(createorganizeManagementTaskDto: any, files: any) {
    const parsedItems = JSON.parse(createorganizeManagementTaskDto.record);
    const {
      key,
      name,
      assigned,
      dueDate,
      status,
      remark,
      assignedDate,
      organizedId,
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
    return this.organizeManagementtaskRepo.create({
      data: {
        name,
        status,
        assigned,
        assignedDate,
        dueDate,
        remark,
        organizeManagementId: +organizedId,
        pathFiles: {
          objectName: filePath ?? filePath?.objectName,
          originalName: filePath ?? filePath?.originalName,
        },
        expenses: 0,
      },
    });
  }

  findAll() {
    return this.organizeManagementtaskRepo.findMany({});
  }

  async findMany(condition: Prisma.organizeManagementTaskFindManyArgs) {
    const { where } = condition || {};

    const response = await this.organizeManagementtaskRepo.findMany({
      where,
      include: {
        organizeSubTasks: true,
      },
      orderBy: { id: 'asc' },
    });

    const result = await Promise.all(
      response.map(async (item: any) => {
        // 👉 parent file
        const parentFile = item.pathFIles as {
          objectName: string;
          originalName: string;
        } | null;

        const parentUrl = parentFile?.objectName
          ? await this.minioService.getPresignedUrl(
              config.minioBucketRes,
              parentFile.objectName,
            )
          : null;

        // 👉 subtask files
        const subTasks = await Promise.all(
          (item.organizeSubTasks || []).map(async (sub) => {
            const subFile = sub.pathFiles as {
              objectName: string;
              originalName: string;
            } | null;

            const subUrl = subFile?.objectName
              ? await this.minioService.getPresignedUrl(
                  config.minioBucketOrganize,
                  subFile.objectName,
                )
              : null;

            return {
              ...sub,
              fileUrl: subUrl,
            };
          }),
        );

        return {
          ...item,
          fileUrl: parentUrl,
          organizeSubTasks: subTasks,
        };
      }),
    );

    return result;
  }

  findOne(id: number) {
    return this.organizeManagementtaskRepo.findOne({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    updateorganizeManagementTaskDto: Prisma.organizeManagementTaskUpdateInput,
  ) {
    return this.organizeManagementtaskRepo.update({
      where: {
        id,
      },
      data: updateorganizeManagementTaskDto,
    });
  }

  remove(id: number) {
    return this.organizeManagementtaskRepo.delete({
      where: {
        id,
      },
    });
  }
}
