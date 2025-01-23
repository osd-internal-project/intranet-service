import {
  DataLeaveRepository,
  MasterTypeLeaveRepository,
  UsersRepository,
  AccessService,
  UserPermissionGroupRepository,
  UserGroupRepository,
  NotificationLogsRepository,
  ModuleTypes,
} from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

@Injectable()
export class DataLeaveService {
  constructor(
    private readonly dataleaveRepo: DataLeaveRepository,
    private readonly mastertypeLeaveRepo: MasterTypeLeaveRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
    private readonly userPermissionGroupRepo: UserPermissionGroupRepository,
    private userGroupRepo: UserGroupRepository,
    private notificationlogsRepo: NotificationLogsRepository,
    private readonly userRepo: UsersRepository,
  ) {}

  async create(condition: Prisma.dataLeaveCreateArgs) {
    // const leaveLetter = await this.dataleaveRepo.create(condition);
    // const userDetail = await this.userRepo.findOne({
    //   where: { userId: leaveLetter.userId },
    // });
    // if (leaveLetter) {
    //   await this.notificationlogsRepo.create({
    //     data: {
    //       sendUserId: leaveLetter.userId,
    //       sendUserName: `${leaveLetter.firstName} ${leaveLetter.lastName}`,
    //       toGroupIds: userDetail.ownerGroupId,
    //       refId: leaveLetter.id,
    //       type: 'leave',
    //       action: 'waitting',
    //       notiStatus: 'no-action',
    //     },
    //   });
    // }
    // return leaveLetter;
  }
  findAll() {
    return this.dataleaveRepo.findAll();
  }

  findOne(id: number) {
    return this.dataleaveRepo.findOne({ where: { id: id } });
  }

  async findMany(userId: string) {
    // const UserIdArray =
    //   await this.accessService.getLeaveAccessedUsersByHeaderUserId(userId);

    return await this.dataleaveRepo.findMany({
      // where: {
      //   userId: {
      //     in: UserIdArray,
      //   },
      // },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findGroup(userId: string) {
    const getUser = await this.usersRepo.findOne({ where: { userId: userId } });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET_APPROVE_LEAVE,
      getUser.ownerGroupId,
    );
    return await this.dataleaveRepo.findMany({
      where: {
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findManyByCondition(params: any) {
    const base = {
      where: {
        ...params,
        ...(params.typeId && { typeId: +params.typeId }),
      },
      include: {
        dataLeaveFiles: true,
      },
      orderBy: { id: 'asc' },
    } as any;

    return this.dataleaveRepo.findMany(base);
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
      const leaveCountlimitMap =
        this.countlimitLeavesByTypeIdMap(dataLeaveWrapup);
      const leaveCountlimit = leaveCountlimitMap[event.typeId] || 0;
      const limitLeaveLastResult =
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
      const calHours = parseFloat((leaveCount % 1).toFixed(1));
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
    const data = leaveRecords.reduce((acc, record) => {
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
      const calHours = parseFloat((leaveCount % 1).toFixed(1));
      if (calLeave % 8 !== 0) {
        if (!Number.isInteger(calLeave)) {
          const isInRange = calHours >= 0.0 && calHours <= 0.8;
          if (isInRange) {
            leaveCount += 0.2;
          }
        }
      }
      acc[record.typeId] = leaveCount;
      acc[record.typeId] = parseFloat(leaveCount.toFixed(2));
      return acc;
    }, {});
    return data;
  }

  async findHeaderId(token: string) {
    // console.log(token);

    const getUser = await this.usersRepo.findOne({ where: { token: token } });

    // console.log(getUser);

    const result = await this.accessService.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_LEAVE,
      getUser.userId,
    );

    Logger.debug(result);

    return result;
  }

  async findLeaveByUserId(userId: string) {
    const accessedUserIds = await this.accessService.getOwnerGroupByUserId(
      userId,
    );

    if (accessedUserIds) {
      let currentGroupId = accessedUserIds.groupId;
      while (currentGroupId) {
        const header = await this.userPermissionGroupRepo.findFirst({
          where: { userGroupId: currentGroupId },
        });
        // if (header && header.leaveUserId.length > 0) {
        //   const users = await this.usersRepo.findMany({
        //     where: {
        //       userId: {
        //         in: header.leaveUserId,
        //       },
        //     },
        //   });
        //   if (users && users.length > 0) {
        //     return users;
        //   }
        // }
        const userGroup = await this.userGroupRepo.findOne({
          where: { groupId: currentGroupId },
        });
        if (userGroup && userGroup.parentGroupId) {
          currentGroupId = userGroup.parentGroupId;
        } else {
          break;
        }
      }
    }
    return [];
  }

  async update(condition: Prisma.dataLeaveUpdateArgs) {
    return await this.dataleaveRepo.update(condition);
  }

  remove(id: number) {
    const dataLeaveid = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(dataLeaveid);
  }
}
