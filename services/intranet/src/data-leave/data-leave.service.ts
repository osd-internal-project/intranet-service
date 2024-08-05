import {
  DataLeaveRepository,
  dataLeaveFilesRepository,
  MasterTypeLeaveRepository,
  UsersRepository,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

@Injectable()
export class DataLeaveService {
  constructor(
    private readonly dataleaveRepo: DataLeaveRepository,
    private readonly dataleavefileRepo: dataLeaveFilesRepository,
    private readonly mastertypeLeaveRepo: MasterTypeLeaveRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async create(condition: Prisma.dataLeaveCreateArgs) {
    return await this.dataleaveRepo.create(condition);
  }
  findAll() {
    return this.dataleaveRepo.findAll();
  }
  findOne(id: number) {
    return `This action returns a #${id} dataLeave`;
  }
  async findMany(condition: Prisma.dataLeaveFindManyArgs) {
    return await this.dataleaveRepo.findMany(condition);
  }

  async findDetailTypeLeaveByUserId(userId: string) {
    const condition = {
      where: {
        userId: userId,
      },
      include: { typeLeaveDisabledMap: true },
      orderBy: {
        createdAt: 'asc',
      },
    } as Prisma.usersFindFirstArgs;

    const resUser = await this.usersRepo.findOne(condition);
    const startWork = dayjs(resUser.startWork);
    const DateNow = dayjs();
    const numberWorkStart = DateNow.diff(startWork, 'year');
    const dataTypeLeave = await this.mastertypeLeaveRepo.findAll();

    const dataLeaveWrapup = await this.dataleaveRepo.findMany({
      where: {
        userId: userId,
        status: {
          in: ['approved', 'waitting'],
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    } as Prisma.dataLeaveFindFirstArgs);

    const leaveCountMap = this.countLeavesByTypeIdMap(dataLeaveWrapup);

    const lastResult = dataTypeLeave.map((event) => {
      const leaveCount = leaveCountMap[event.typeId] || 0;
      const mapdata = {
        id: event.id,
        typeId: event.typeId,
        typeName: event.typeName,
        forwardLeave: event.forwardLeave,
        haveLeft: leaveCount,
        limitLeave:
          numberWorkStart <= 1
            ? event.limitLeaveFour
            : numberWorkStart >= 1
            ? event.limitLeaveOne
            : numberWorkStart >= 3
            ? event.limitLeaveTwo
            : numberWorkStart >= 5
            ? event.limitLeaveThree
            : null,
        limitLeaveLastResult:
          numberWorkStart <= 1
            ? Number(event.limitLeaveFour) - leaveCount
            : numberWorkStart >= 1
            ? Number(event.limitLeaveOne) - leaveCount
            : numberWorkStart >= 3
            ? Number(event.limitLeaveTwo) - leaveCount
            : numberWorkStart >= 5
            ? Number(event.limitLeaveThree) - leaveCount
            : null,
        descriptionLeave: event.descriptionLeave,
        typeEveryDay: event.typeEveryDay,
        typeNameEn: event.typeNameEn,
        typeNameTh: event.typeNameTh,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      };
      return mapdata;
    });

    return lastResult;
  }
  async findUserByUserId(userId: string) {
    const condition = {
      where: {
        userId: userId,
      },
      include: { typeLeaveDisabledMap: true },
      orderBy: {
        createdAt: 'asc',
      },
    } as Prisma.usersFindFirstArgs;

    const resUser = await this.usersRepo.findOne(condition);

    return resUser;
  }

  countLeavesByTypeIdMap(leaveRecords) {
    return leaveRecords.reduce((acc, record) => {
      acc[record.typeId] = (acc[record.typeId] || 0) + 1;
      return acc;
    }, {});
  }

  async update(condition: Prisma.dataLeaveUpdateArgs) {
    return await this.dataleaveRepo.update(condition);
  }

  remove(id: Number) {
    const condition = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(condition);
  }
}
