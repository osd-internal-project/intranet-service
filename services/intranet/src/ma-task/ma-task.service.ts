import { Injectable } from '@nestjs/common';
import { MaTaskFilesRepository, MaTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class MaTaskService {
  constructor(
    private readonly maTaskRepo: MaTaskRepository,
    private readonly maTaskFilesRepo: MaTaskFilesRepository,
  ) {}
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
  create(data: Prisma.maTaskCreateInput) {
    const condition = {
      data: data,
    } as Prisma.maTaskCreateArgs;
    return this.maTaskRepo.create(condition);
  }

  findAll() {
    return this.maTaskRepo.findAll();
  }

  findOne(condition: Prisma.maTaskFindFirstArgs) {
    return this.maTaskRepo.findOne(condition);
  }
  async findOneById(id: number) {
    const task = await this.maTaskRepo.findOne({
      where: { id: id },
      include: { refTask: true, nextTask: true },
    });
    const imageList = await this.maTaskFilesRepo.findMany({
      where: {
        maTaskId: task.id,
        type: 'image',
      },
    });

    // Fetch the draft posts
    const fileList = await this.maTaskFilesRepo.findMany({
      where: {
        maTaskId: task.id,
        type: 'attend',
      },
    });
    return { ...task, fileList: fileList, imageList: imageList };
  }
  async findDataTable(query: any) {
    const { take, skip, typeid, maName, maDate, contact, maStatus } = query;
    const data = await this.maTaskRepo.findMany({
      where: {
        ...(typeid && { maTypeId: Number(typeid) }),
        ...(maName && { maName: { contains: maName } }),
        ...(maDate && {
          maDate: {
            gte: this.startOfDate(maDate[0]),
            lte: this.endOfDate(maDate[1]),
          },
        }),
        ...(contact && { contact: { contains: contact } }),
        ...(maStatus && { maStatus: maStatus }),
      },
      orderBy: [{ createdAt: 'desc' }],
      take: +take,
      skip: +skip,
    });
    const count = await this.maTaskRepo.count({
      where: {
        ...(typeid && { maTypeId: Number(typeid) }),
        ...(maName && { maName: { contains: maName } }),
        ...(maDate && {
          maDate: {
            gte: this.startOfDate(maDate[0]),
            lte: this.endOfDate(maDate[1]),
          },
        }),
        ...(contact && { contact: { contains: contact } }),
        ...(maStatus && { maStatus: maStatus }),
      },
    });
    return { data: data, count: count };
  }

  async findRangeEvent(query: any) {
    const { start, end } = query;
    const data = await this.maTaskRepo.findMany({
      where: {
        ...(start &&
          end && {
            maDate: {
              gte: this.startOfDate(start),
              lte: this.endOfDate(end),
            },
          }),
      },
      orderBy: [{ createdAt: 'desc' }],
    });
    return data;
  }

  findMany(condition: Prisma.maTaskFindManyArgs) {
    return this.maTaskRepo.findMany(condition);
  }

  update(id: number, data: Prisma.maTaskUpdateInput) {
    return this.maTaskRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.maTaskRepo.delete({ where: { id: id } });
  }
}
