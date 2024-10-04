import {
  DataLeaveRepository,
  dataLeaveFilesRepository,
  MasterTypeLeaveRepository,
  UsersRepository,
  AccessService,
  UserGroupMapHeaderRepository,
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
    private readonly accessService: AccessService,
    private readonly userGroupMapHeaderRepo: UserGroupMapHeaderRepository,
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
    return await this.dataleaveRepo.findMany({
      ...condition,
      orderBy: {
        id: 'desc',
      },
    });
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
      let leaveCount = leaveCountMap[event.typeId] || 0;
      const leaveCountlimitMap =
        this.countlimitLeavesByTypeIdMap(dataLeaveWrapup);
      let leaveCountlimit = leaveCountlimitMap[event.typeId] || 0;
      let limitLeaveLastResult =
        numberWorkStart <= 1
          ? Number(event.limitLeaveFour) - leaveCountlimit
          : numberWorkStart >= 1
          ? Number(event.limitLeaveOne) - leaveCountlimit
          : numberWorkStart >= 3
          ? Number(event.limitLeaveTwo) - leaveCountlimit
          : numberWorkStart >= 5
          ? Number(event.limitLeaveThree) - leaveCountlimit
          : null;

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
        limitLeaveLastResult: limitLeaveLastResult,
        // limitLeaveLastResult:
        //   numberWorkStart <= 1
        //     ? Number(event.limitLeaveFour) - leaveCount
        //     : numberWorkStart >= 1
        //     ? Number(event.limitLeaveOne) - leaveCount
        //     : numberWorkStart >= 3
        //     ? Number(event.limitLeaveTwo) - leaveCount
        //     : numberWorkStart >= 5
        //     ? Number(event.limitLeaveThree) - leaveCount
        //     : null,
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
        id: 'desc',
      },
    } as Prisma.usersFindFirstArgs;

    const resUser = await this.usersRepo.findOne(condition);

    return resUser;
  }

  countLeavesByTypeIdMap(leaveRecords) {
    const test = leaveRecords.reduce((acc, record) => {
      const hours = record.leaveHour;
      if (!acc[record.typeId]) {
        acc[record.typeId] = 0;
      }

      let calLeave = hours / 8;
      if (hours % 8 !== 0) {
        calLeave = Math.floor(calLeave) + (hours % 8) / 10;
      }
      acc[record.typeId] += calLeave;
      let leaveCount = acc[record.typeId];
      const calHours = leaveCount % 1;

      if (calHours >= 0.8 && calHours <= 1) {
        leaveCount += 0.2;
      }
      acc[record.typeId] = leaveCount;
      acc[record.typeId] = parseFloat(leaveCount.toFixed(2));

      return acc;
    }, {});
    return test;
  }

  countlimitLeavesByTypeIdMap(leaveRecords) {
    const test = leaveRecords.reduce((acc, record) => {
      const hours = record.leaveHour;
      if (!acc[record.typeId]) {
        acc[record.typeId] = 0;
      }

      let calLeave = hours / 8;
      if (hours % 8 !== 0) {
        calLeave = Math.floor(calLeave) + (hours % 8) / 10;
      }
      acc[record.typeId] += calLeave;
      let leaveCount = acc[record.typeId];
      const calHours = leaveCount % 1;
      if (calLeave % 8 !== 0) {
        if (calHours >= 0.0 && calHours <= 0.2) {
          leaveCount += 0.2;
        }
      }
      acc[record.typeId] = leaveCount;
      acc[record.typeId] = parseFloat(leaveCount.toFixed(2));
      return acc;
    }, {});
    return test;
  }

  async findLeaveByUserId(userId: string) {
    const accessedUserIds = await this.accessService.getOwnerGroupByUserId(
      userId,
    );
    if (accessedUserIds) {
      const header = await this.userGroupMapHeaderRepo.findOne({
        where: { userGroupId: accessedUserIds.groupId },
      });
      if (header) {
        if (header.leaveUserId.length > 0) {
          const users = await this.usersRepo.findMany({
            where: {
              userId: {
                in: header.leaveUserId,
              },
            },
          });
          return users;
        } else {
        }
      }
    }
    return [];
  }

  async update(condition: Prisma.dataLeaveUpdateArgs) {
    return await this.dataleaveRepo.update(condition);
  }

  remove(id: Number) {
    const dataLeaveid = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(dataLeaveid);
  }
}
