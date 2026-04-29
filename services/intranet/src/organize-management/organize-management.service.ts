import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { organizeManagementRepository } from '@inventory/share';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { v4 as uuidv4 } from 'uuid';
import appConfig from '../configs';
const config = appConfig();
import * as path from 'path';

@Injectable()
export class OrganizeManagementService {
  constructor(
    private readonly organizeManagementRepo: organizeManagementRepository,
    private readonly minioService: MinioClientService,
  ) {}
  // async create(createorganizeManagementTaskDto: any, ) {
  //   const parsedItems = JSON.parse(
  //     createorganizeManagementTaskDto.organizeTasks,
  //   );
  //   const fileMap = new Map<string, Express.Multer.File[]>();
  //   files.forEach((file) => {
  //     const tempId = file.fieldname.replace('files_', '');
  //     if (!fileMap.has(tempId)) {
  //       fileMap.set(tempId, []);
  //     }
  //     fileMap.get(tempId).push(file);
  //   });
  //   const mainTasks = parsedItems.filter((t) => !t.parentId);
  //   const subTasks = parsedItems.filter((t) => t.parentId);
  //   const subTaskMap = new Map<string, any[]>();
  //   subTasks.forEach((sub) => {
  //     if (!subTaskMap.has(sub.parentId)) {
  //       subTaskMap.set(sub.parentId, []);
  //     }
  //     subTaskMap.get(sub.parentId).push(sub);
  //   });
  //   let objectName = '';
  //   const uploadToMinio = async (file: Express.Multer.File) => {
  //     const bucket = config.minioBucketOrganize;
  //     const uuidName = uuidv4();
  //     const ext = path.extname(file.originalname); // ✅ ถูกต้อง
  //     objectName = `${uuidName}${ext}`;
  //     await this.minioService.uploadFile(
  //       file.buffer,
  //       file.size,
  //       bucket,
  //       objectName,
  //     );
  //     return objectName;
  //   };
  //   const data: Prisma.organizeManagementCreateInput = {
  //     name: createorganizeManagementTaskDto.name,
  //     date: new Date(createorganizeManagementTaskDto.date),
  //     createdBy: '',
  //     updatedBy: '',
  //     organizeManagementTask: {
  //       create: await Promise.all(
  //         mainTasks.map(async (main) => {
  //           const mainFiles = fileMap.get(main.tempId) || [];
  //           const uploadedMain = await Promise.all(
  //             mainFiles.map(uploadToMinio),
  //           );
  //           return {
  //             name: main.name,
  //             status: main.status ?? 'inprocess',
  //             assigned: main.assigned ?? null,
  //             assignedDate: main.assignedDate
  //               ? new Date(main.assignedDate)
  //               : new Date(),
  //             remark: main.remark ?? null,
  //             dueDate: main.dueDate ? new Date(main.dueDate) : null,
  //             pathFIles: uploadedMain.join(','),
  //             organizeSubTasks: {
  //               create: await Promise.all(
  //                 (subTaskMap.get(main.tempId) || []).map(async (sub) => {
  //                   const subFiles = fileMap.get(sub.tempId) || [];
  //                   const uploadedSub = await Promise.all(
  //                     subFiles.map(uploadToMinio),
  //                   );
  //                   return {
  //                     name: sub.name,
  //                     assigned: sub.assigned ?? null,
  //                     assignedDate: sub.assignedDate
  //                       ? new Date(sub.assignedDate)
  //                       : new Date(),
  //                     status: sub.status ?? 'inprocess',
  //                     remark: sub.remark ?? null,
  //                     dueDate: sub.dueDate ? new Date(sub.dueDate) : null,
  //                     pathFIles: uploadedSub.join(','),
  //                   };
  //                 }),
  //               ),
  //             },
  //           };
  //         }),
  //       ),
  //     },
  //   };
  //   return this.organizeManagementRepo.create({ data });
  // }

  async create(
    createorganizeManagementTaskDto: Prisma.organizeManagementCreateInput,
  ) {
    return this.organizeManagementRepo.create({
      data: createorganizeManagementTaskDto,
    });
  }

  findAll() {
    return this.organizeManagementRepo.findMany({});
  }

  async findMany(condition: Prisma.organizeManagementFindManyArgs) {
    const { skip, take, where } = condition || {};
    const response = await this.organizeManagementRepo.findMany({
      skip,
      take,
      where,
      include: {
        organizeManagementTask: {
          include: {
            organizeSubTasks: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
    const count = await this.organizeManagementRepo.count({
      where,
    });
    return {
      data: response,
      count,
    };
  }

  async findOne(id: number) {
    const data: any = await this.organizeManagementRepo.findOne({
      where: {
        id,
      },
      include: {
        organizeManagementTask: {
          include: {
            organizeSubTasks: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
    // if (!data) return null;

    // const tasks = await Promise.all(
    //   data.organizeManagementTask.map(async (task) => {
    //     let mainFileUrls: string = '';

    //     if (task.pathFIles) {
    //       mainFileUrls = await this.minioService.getPresignedUrl(
    //         config.minioBucketOrganize,
    //         task.pathFIles,
    //       );
    //     }

    //     const subTasks = await Promise.all(
    //       task.organizeSubTasks.map(async (sub) => {
    //         let subFileUrls: string = '';

    //         if (sub.pathFIles) {
    //           subFileUrls = await this.minioService.getPresignedUrl(
    //             config.minioBucketOrganize,
    //             sub.pathFIles,
    //           );
    //         }

    //         return {
    //           ...sub,
    //           fileUrl: subFileUrls,
    //         };
    //       }),
    //     );

    //     return {
    //       ...task,
    //       fileUrl: mainFileUrls,
    //       organizeSubTasks: subTasks,
    //     };
    //   }),
    // );

    // return {
    //   ...data,
    //   organizeManagementTask: tasks,
    // };
    return data;
  }

  update(
    id: number,
    updateorganizeManagementTaskDto: Prisma.organizeManagementUpdateInput,
  ) {
    return this.organizeManagementRepo.update({
      where: {
        id,
      },
      data: updateorganizeManagementTaskDto,
    });
  }

  remove(id: number) {
    return this.organizeManagementRepo.delete({
      where: {
        id,
      },
    });
  }

  async getFile(bucket: string, objectName: string) {
    return this.minioService.downloadFile(bucket, objectName);
  }
}
