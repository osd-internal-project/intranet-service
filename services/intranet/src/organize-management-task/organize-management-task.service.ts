import { Injectable, NotFoundException } from '@nestjs/common';
import {
  organizeManagementTaskRepository,
  organizeSubTaskRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { v4 as uuidv4 } from 'uuid';
import appConfig from '../configs';
const config = appConfig();
import * as path from 'path';

@Injectable()
export class organizeManagementTaskService {
  constructor(
    private readonly organizesubtaskRepo: organizeSubTaskRepository,
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
          objectName: filePath?.objectName,
          originalName: filePath?.originalName,
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
        const parentFile = item.pathFiles as {
          objectName: string;
          originalName: string;
        } | null;
        const parentUrl = parentFile?.objectName
          ? await this.minioService.getPresignedUrl(
              config.minioBucketOrganize,
              parentFile.objectName,
            )
          : null;
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

  async update(createorganizeManagementTaskDto: any, files: any, id: number) {
    const parsedItems = JSON.parse(createorganizeManagementTaskDto.record);
    const { name, assigned, dueDate, status, remark, assignedDate } =
      parsedItems || {};

    const uploadToMinio = async (file: Express.Multer.File) => {
      if (!file) return null;
      const data: any = await this.organizeManagementtaskRepo.findOne({
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
    return this.organizeManagementtaskRepo.update({
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

  // update(
  //   id: number,
  //   updateorganizeManagementTaskDto: Prisma.organizeManagementTaskUpdateInput,
  // ) {
  //   return this.organizeManagementtaskRepo.update({
  //     where: {
  //       id,
  //     },
  //     data: updateorganizeManagementTaskDto,
  //   });
  // }

  async remove(id: number) {
    const data: any = await this.organizeManagementtaskRepo.findOne({
      where: { id },
      include: {
        organizeSubTasks: true,
      },
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

    await Promise.all(
      (data.organizeSubTasks || []).map(async (sub) => {
        const file = sub.pathFiles as {
          objectName?: string;
          originalName?: string;
        } | null;
        if (file?.objectName) {
          await this.minioService.deleteFile(
            file.objectName,
            config.minioBucketOrganize,
          );
        }
      }),
    );

    await this.organizesubtaskRepo.deleteMany({
      where: {
        organizeManagementTaskId: id,
      },
    });

    return this.organizeManagementtaskRepo.delete({
      where: { id },
    });
  }
}
