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
    console.log('DataleaveCountMap:', leaveCountMap);

    // const lastResult = dataTypeLeave.map((event) => {
    //   const leaveCount = leaveCountMap[event.typeId] || 0;
    //   console.log('leaveCount:', leaveCount);

    const lastResult = dataTypeLeave.map((event) => {
      let leaveCount = leaveCountMap[event.typeId] || 0;

      const adjustLeaveCount = (leaveCount) => {
        const decimal = leaveCount % 1;
        const integer = Math.floor(leaveCount);
        let adjustedLeaveCount = leaveCount;
        // if (decimal > 0 && decimal < 1) {
        //   adjustedLeaveCount += 0.2;
        // }
        // if (decimal > 0 && decimal < 0.2) {
        //   adjustedLeaveCount += integer * 0.2;
        // }
        // if (integer > 0) {
        //   adjustedLeaveCount += integer * 0.2;
        // }

        return adjustedLeaveCount;
      };
      leaveCount = adjustLeaveCount(leaveCount);
      console.log('leaveCount:', leaveCount);

      const limitLeaveLastResult =
        numberWorkStart <= 1
          ? Number(event.limitLeaveFour) - leaveCount
          : numberWorkStart >= 1 && numberWorkStart < 3
          ? Number(event.limitLeaveOne) - leaveCount
          : numberWorkStart >= 3 && numberWorkStart < 5
          ? Number(event.limitLeaveTwo) - leaveCount
          : numberWorkStart >= 5
          ? Number(event.limitLeaveThree) - leaveCount
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
      console.log('limitLeaveLastResult:', mapdata.limitLeaveLastResult);

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

  // countLeavesByTypeIdMap(leaveRecords) {
  //   console.log('leaveRecords:', leaveRecords);

  //   return leaveRecords.reduce((acc, record) => {
  //     const increment = record.leaveHour / 8;
  //     acc[record.typeId] = (acc[record.typeId] || 0) + increment;
  //     return acc;
  //   }, {});
  // }

  // countLeavesByTypeIdMap(leaveRecords) {
  //   console.log('leaveRecords:', leaveRecords);

  //   return leaveRecords.reduce((acc, record) => {
  //     const increment = record.leaveHour / 8;
  //     if (increment < 1 && record.leaveHour % 8 !== 0) {
  //       acc[record.typeId] =
  //         (acc[record.typeId] || 0) + (0 + (record.leaveHour % 8) / 10);
  //     } else if (increment > 1) {
  //       acc[record.typeId] = (acc[record.typeId] || 0) + 1;
  //     } else {
  //       acc[record.typeId] = (acc[record.typeId] || 0) + increment;
  //     }

  //     return acc;
  //   }, {});
  // }

  countLeavesByTypeIdMap(leaveRecords) {
    console.log('leaveRecords:', leaveRecords);

    return leaveRecords.reduce((acc, record) => {
      const hours = record.leaveHour;
      console.log('hours:', hours);

      if (hours === 8) {
        acc[record.typeId] = (acc[record.typeId] || 0) + 1;
      } else if (hours < 8) {
        acc[record.typeId] = (acc[record.typeId] || 0) + hours / 10;
      } else if (hours > 8) {
        const fullDays = Math.floor(hours / 8);
        const remainingHours = hours % 8;
        const decimalHours = remainingHours / 10;

        acc[record.typeId] =
          (acc[record.typeId] || 0) + fullDays + decimalHours;
      }

      return acc;
    }, {});
  }

  async update(condition: Prisma.dataLeaveUpdateArgs) {
    return await this.dataleaveRepo.update(condition);
  }

  remove(id: Number) {
    const dataLeaveid = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(dataLeaveid);
  }
}
