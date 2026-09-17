import {
  DataLeaveRepository,
  MasterTypeLeaveRepository,
  UsersRepository,
  AccessService,
  UserPermissionGroupRepository,
  UserGroupRepository,
  ModuleTypes,
  LogLeaveDataRepository,
  NotificationEmitterService,
  fmtThaiDate,
} from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import {
  templateDataLeave,
  templateDataLeaveApproved,
} from '../utils/template-booking-leave';
import { json } from 'stream/consumers';

@Injectable()
export class DataLeaveService {
  private readonly logger = new Logger(DataLeaveService.name);

  constructor(
    private readonly dataleaveRepo: DataLeaveRepository,
    private readonly mastertypeLeaveRepo: MasterTypeLeaveRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
    private readonly userPermissionGroupRepo: UserPermissionGroupRepository,
    private readonly logLeaveDataRepo: LogLeaveDataRepository,
    private userGroupRepo: UserGroupRepository,
    private readonly emitter: NotificationEmitterService,
  ) {}

  /** แปลงสถานะอนุมัติเป็นข้อความไทยสำหรับหัวข้อแจ้งเตือน */
  private approvalLabel(status: string): string {
    const s = status.toLowerCase();
    if (s.includes('approve')) return 'ได้รับการอนุมัติ';
    if (s.includes('reject') || s.includes('disap') || s.includes('not'))
      return 'ถูกปฏิเสธ';
    return `: ${status}`;
  }

  async create(condition: Prisma.dataLeaveCreateArgs) {
    // log payload ที่รับมาก่อนบันทึกลง DB เพื่อใช้ตรวจสอบเมื่อข้อมูลผิดพลาด
    this.logger.log(`[create] payload=${JSON.stringify(condition?.data)}`);
    const leaveLetter = await this.dataleaveRepo.create(condition);
    if (leaveLetter) {
      const d: any = condition.data;
      await this.emitter.dispatch('leave-request', {
        requesterUserId: d.userId,
        refId: leaveLetter.id,
        event: 'created',
        title: `ใบลารออนุมัติ: ${d.firstName ?? ''} ${d.lastName ?? ''}`.trim(),
        message: `${d.typeName ?? 'ลางาน'} ${fmtThaiDate(d.startDate)}`,
        path: '/page/leave-control-management/leave-history-admin',
        mail: {
          subject: 'OSD Intranet ใบลาออนไลน์',
          html: await templateDataLeave(d),
        },
      });
    }
    return leaveLetter;
  }
  findAll() {
    return this.dataleaveRepo.findAll();
  }

  async findOne(userId: string, skip: number, take: number) {
    const data = await this.dataleaveRepo.findMany({
      where: { userId: userId },
      include: { dataLeaveFiles: true },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
    const count = await this.dataleaveRepo.count({
      where: { userId: userId },
    });
    return { data, count };
  }

  async findMany(params: any) {
    let whereConditions = [];
    if (params.userId) {
      whereConditions = [...whereConditions, { userId: params.userId }];
    }
    if (params.TypeId) {
      whereConditions = [...whereConditions, { typeId: +params.TypeId }];
    }
    if (params.startDate) {
      whereConditions = [
        ...whereConditions,
        {
          startDate: {
            gte: dayjs(params.startDate).startOf('day').toDate(),
            lte: dayjs(params.startDate).endOf('day').toDate(),
          },
        },
      ];
    }
    if (params.endDate) {
      whereConditions = [
        ...whereConditions,
        {
          endDate: {
            gte: dayjs(params.startDate).startOf('day').toDate(),
            lte: dayjs(params.startDate).endOf('day').toDate(),
          },
        },
      ];
    }
    if (params.startTime) {
      whereConditions = [...whereConditions, { startTime: params.startTime }];
    }
    if (params.endTime) {
      whereConditions = [...whereConditions, { endTime: params.endTime }];
    }
    if (params.startDate) {
      whereConditions = [...whereConditions, { status: { not: 'cancel' } }];
    }

    const count = await this.dataleaveRepo.count({
      where: {
        AND: whereConditions,
      },
    });
    return { count: count, status: count > 0 ? 200 : 404 };
  }

  async findCalendarGroupByMonth(
    token: string,
    query: { month: Date | string },
  ) {
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET,
      getUser.ownerGroupId,
    );
    const data = await this.dataleaveRepo.findMany({
      where: {
        startDate: {
          gte: dayjs(query.month).startOf('month').toDate(),
          lte: dayjs(query.month).endOf('month').toDate(),
        },
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
        status: { in: ['approved', 'waiting'] },
      },
      include: { dataLeaveFiles: true },
      orderBy: { createdAt: 'desc' },
    });
    return data;
  }
  async findCalendarByMonth(token: string, query: { month: Date | string }) {
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    const data = await this.dataleaveRepo.findMany({
      where: {
        startDate: {
          gte: dayjs(query.month).startOf('month').toDate(),
          lte: dayjs(query.month).endOf('month').toDate(),
        },
        userId: getUser.userId,
        status: { in: ['approved', 'waiting'] },
      },
      include: { dataLeaveFiles: true },
      orderBy: { createdAt: 'desc' },
    });

    return data;
  }

  async findGroup(token: string, query: any, skip: number, take: number) {
    let filter = {} as Prisma.dataLeaveWhereInput;
    const { fullname, status, createdAt, leaveAt, typeName } = query;
    if (fullname) {
      const names = fullname.trim().split(' ').filter(Boolean);
      const orConditions = names.flatMap((word) => [
        {
          firstName: {
            contains: word,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: word,
            mode: 'insensitive',
          },
        },
      ]);
      filter = { ...filter, OR: orConditions };
    }
    if (status) {
      filter = { ...filter, status: status };
    }
    if (typeName) {
      filter = {
        ...filter,
        typeName: {
          contains: typeName,
          mode: 'insensitive',
        },
      };
    }
    if (createdAt) {
      filter = {
        ...filter,
        createdAt: {
          gte: dayjs(createdAt[0]).startOf('day').toDate(),
          lte: dayjs(createdAt[1]).endOf('day').toDate(),
        },
      };
    }
    if (leaveAt) {
      filter = {
        ...filter,
        startDate: { lte: dayjs(leaveAt[1]).endOf('day').toDate() },
        endDate: { gte: dayjs(leaveAt[0]).startOf('day').toDate() },
      };
    }
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET,
      getUser.ownerGroupId,
    );
    const data = await this.dataleaveRepo.findMany({
      where: {
        ...filter,
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
        status: { in: ['approved', 'waiting'] },
      },
      include: { dataLeaveFiles: true },
      orderBy: { createdAt: 'desc' },
      ...(skip && take && { skip, take }),
    });
    const count = await this.dataleaveRepo.count({
      where: {
        ...filter,
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
        status: { in: ['approved', 'waiting'] },
      },
    });
    return { data, count };
  }
  /** มุมมองของ HR — เห็นทุกกลุ่มและทุกสถานะ (รวมที่ยกเลิก) ต่างจาก findGroup ที่จำกัดตามกลุ่มและสถานะ */
  async findGroupHr(query: any, skip: number, take: number) {
    let filter = {} as Prisma.dataLeaveWhereInput;
    const { fullname, status, createdAt, leaveAt, typeName } = query;
    if (fullname) {
      const names = fullname.trim().split(' ').filter(Boolean);
      const orConditions = names.flatMap((word) => [
        {
          firstName: {
            contains: word,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: word,
            mode: 'insensitive',
          },
        },
      ]);
      filter = { ...filter, OR: orConditions };
    }
    if (status) {
      filter = { ...filter, status: status };
    }
    if (typeName) {
      filter = {
        ...filter,
        typeName: {
          contains: typeName,
          mode: 'insensitive',
        },
      };
    }
    if (createdAt) {
      filter = {
        ...filter,
        createdAt: {
          gte: dayjs(createdAt[0]).startOf('day').toDate(),
          lte: dayjs(createdAt[1]).endOf('day').toDate(),
        },
      };
    }
    if (leaveAt) {
      filter = {
        ...filter,
        startDate: { lte: dayjs(leaveAt[1]).endOf('day').toDate() },
        endDate: { gte: dayjs(leaveAt[0]).startOf('day').toDate() },
      };
    }
    const data = await this.dataleaveRepo.findMany({
      where: { ...filter },
      include: { dataLeaveFiles: true },
      orderBy: { createdAt: 'desc' },
      ...(skip && take && { skip, take }),
    });

    const count = await this.dataleaveRepo.count({
      where: { ...filter },
    });
    return { data, count };
  }

  async findManyByCondition(params: any) {
    const { startDate, ...restParams } = params;
    const startOfYear = dayjs(startDate).startOf('year').toDate();
    const endOfYear = dayjs(startDate).endOf('year').toDate();
    const base = {
      where: {
        ...restParams,
        ...(params.typeId && { typeId: +params.typeId }),
        status: {
          in: ['approved', 'waiting'],
        },
        createdAt: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      include: { dataLeaveFiles: true },
      orderBy: { createdAt: 'desc' },
    } as Prisma.dataLeaveFindManyArgs;
    return await this.dataleaveRepo.findMany(base);
  }

  async findLeaveTotalByGroup(
    token: string,
    query: any,
    skip: number,
    take: number,
  ) {
    let filter = {};
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET,
      getUser.ownerGroupId,
    );
    if (query.type === 'fullname' && query.value) {
      const names = query.value.trim().split(' ').filter(Boolean);
      const orConditions = names.flatMap((word) => [
        {
          firstName: {
            contains: word,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: word,
            mode: 'insensitive',
          },
        },
      ]);
      filter = { ...filter, OR: orConditions };
    } else if (query.type === 'status') {
      filter = { ...filter, status: query.value };
    } else if (query.type === 'type_name') {
      filter = {
        ...filter,
        typeName: {
          contains: query.value,
          mode: 'insensitive',
        },
      };
    }
    const userGroup = await this.usersRepo.findMany({
      where: {
        ownerGroupId: { in: AccessedGroup.map((event: any) => event.groupId) },
      },
      select: {
        userId: true,
        username: true,
        firstNameTh: true,
        lastNameTh: true,
        email: true,
        startWork: true,
      },
    });

    const masterTypeLave = await this.mastertypeLeaveRepo.findMany({
      orderBy: { id: 'asc' },
    });

    const data = await this.dataleaveRepo.findMany({
      where: {
        ...filter,
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
        status: { in: ['approved'] },
        startDate: {
          gte: dayjs(new Date()).startOf('year').toDate(),
        },
        endDate: {
          lte: dayjs(new Date()).endOf('year').toDate(),
        },
      },
      include: { dataLeaveFiles: true },
      orderBy: { createdAt: 'desc' },
      ...(skip && take && { skip, take }),
    });
    const userMap = new Map(
      userGroup.map((user) => [
        user.userId,
        { ...user, leaveSummary: [], totalCount: 0, totalLeaveHour: 0 },
      ]),
    );
    const masterTypeLeaveMap = new Map(
      masterTypeLave.map((type) => [type.typeId, type]),
    );
    data.forEach((leave) => {
      const user = userMap.get(leave.userId);
      const typeLeave = masterTypeLeaveMap.get(leave.typeId);

      if (user) {
        if (!user.leaveSummary) {
          user.leaveSummary = [];
          user.totalCount = 0;
          user.totalLeaveHour = 0;
        }

        const startDate = new Date(user.startWork);
        const now = new Date();
        const diffTime = now.getTime() - startDate.getTime();
        const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
        const isNewStaff = diffYears < 1;
        const leaveLimit = isNewStaff
          ? typeLeave.limitLeaveFour
          : diffYears < 3
          ? typeLeave.limitLeaveOne
          : diffYears < 5
          ? typeLeave.limitLeaveTwo
          : typeLeave.limitLeaveThree;
        const type = leave.typeName;
        if (!user.leaveSummary[type]) {
          user.leaveSummary[type] = {
            count: 0,
            leaveHour: 0,
            limit: +leaveLimit * 8,
          };
        }
        user.leaveSummary[type].count += 1;
        user.leaveSummary[type].leaveHour += leave.leaveHour || 0;
        user.totalCount += 1;
        user.totalLeaveHour += leave.leaveHour || 0;
      }
    });
    const result = Array.from(userMap.values()).map((user, index) => ({
      id: index + 1,
      ...user,
      leaveSummary: Object.entries(user.leaveSummary || {}).map(
        ([type, summary]) => ({
          id: index + 1,
          type_leave: type,
          count: summary.count,
          leaveHour: summary.leaveHour,
          limit: +summary.limit,
          userId: user.userId,
        }),
      ),
    }));
    return { data: result, count: result.length };
  }

  async findDetailTypeLeaveByUserId(userId: string) {
    const startOfYear = dayjs(new Date()).startOf('year').toDate();
    const endOfYear = dayjs(new Date()).endOf('year').toDate();
    const condition = {
      where: {
        userId: userId,
      },
      include: { typeLeaveDisabledMap: true },
      orderBy: { createdAt: 'desc' },
    } as Prisma.usersFindFirstArgs;
    const resUser = await this.usersRepo.findOne(condition);
    const dateNow = dayjs(new Date());
    const startwork = dayjs(resUser?.startWork);
    const yearOfWork = dateNow.diff(startwork, 'years', true);
    const normalLeave = await this.dataleaveRepo.findMany({
      where: {
        userId,
        status: { in: ['approved', 'waiting'] },
        typeId: { not: 6 },
        AND: [
          { startDate: { lte: endOfYear } },
          { endDate: { gte: startOfYear } },
        ],
      },
    });

    const maternityLeave = await this.dataleaveRepo.findMany({
      where: {
        userId,
        status: { in: ['approved'] },
        typeId: 6,
      },
    });

    const dataLeaveWrapup = [...normalLeave, ...maternityLeave];
    const CountLeaveByTypeMap = this.countLeavesByTypeIdMap(dataLeaveWrapup);
    const dataTypeLeave = await this.mastertypeLeaveRepo.findMany({
      orderBy: { id: 'asc' },
    });
    const lastResult = dataTypeLeave.map((event) => {
      const leaveCount = CountLeaveByTypeMap[event.typeId] || 0;
      let limitLeaveLastResult = 0;
      let limitLeave = 0;
      const trimmed = leaveCount.total
        ? Math.floor(leaveCount.total * 10) / 10
        : 0;
      if (yearOfWork <= 1) {
        limitLeaveLastResult = parseFloat(event.limitLeaveFour) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveFour);
      } else if (yearOfWork < 3) {
        limitLeaveLastResult = parseFloat(event.limitLeaveOne) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveOne);
      } else if (yearOfWork < 5) {
        limitLeaveLastResult = parseFloat(event.limitLeaveTwo) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveTwo);
      } else {
        limitLeaveLastResult = parseFloat(event.limitLeaveThree) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveThree);
      }
      if (limitLeaveLastResult < 0) {
        limitLeaveLastResult = 0;
      }
      const mapdata = {
        id: event.id,
        typeId: event.typeId,
        typeName: event.typeName,
        forwardLeave: event.forwardLeave,
        haveLeaveDays: leaveCount.valueHours,
        haveLeaveHours: leaveCount.valueMinute,
        limitLeave: limitLeave,
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

  async findDetailByTypeLeaveUserId(userId: string, typeId: number) {
    const startOfYear = dayjs(new Date()).startOf('year').toDate();
    const endOfYear = dayjs(new Date()).endOf('year').toDate();
    const condition = {
      where: {
        userId: userId,
      },
      orderBy: { createdAt: 'desc' },
    } as Prisma.usersFindFirstArgs;
    const resUser = await this.usersRepo.findOne(condition);
    const dateNow = dayjs(new Date());
    const startwork = dayjs(resUser?.startWork);
    const yearOfWork = dateNow.diff(startwork, 'years', true);
    const dataLeaveWrapup = await this.dataleaveRepo.findMany({
      where: {
        userId: userId,
        typeId: +typeId,
        status: {
          in: ['approved', 'waiting'],
        },
        startDate: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    } as Prisma.dataLeaveFindFirstArgs);
    const CountLeaveByTypeMap = this.countLeavesByTypeIdMap(dataLeaveWrapup);
    const dataTypeLeave = await this.mastertypeLeaveRepo.findMany({
      where: { typeId: +typeId },
      orderBy: { id: 'asc' },
    });
    const lastResult = dataTypeLeave.map((event) => {
      const leaveCount = CountLeaveByTypeMap[event.typeId] || 0;
      let limitLeaveLastResult = 0;
      let limitLeave = 0;
      const trimmed = leaveCount.total
        ? Math.floor(leaveCount.total * 10) / 10
        : 0;
      if (yearOfWork <= 1) {
        limitLeaveLastResult = parseFloat(event.limitLeaveFour) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveFour);
      } else if (yearOfWork < 3) {
        limitLeaveLastResult = parseFloat(event.limitLeaveOne) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveOne);
      } else if (yearOfWork < 5) {
        limitLeaveLastResult = parseFloat(event.limitLeaveTwo) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveTwo);
      } else {
        limitLeaveLastResult = parseFloat(event.limitLeaveThree) * 8 - trimmed;
        limitLeave = Number(event.limitLeaveThree);
      }
      if (limitLeaveLastResult < 0) {
        limitLeaveLastResult = 0;
      }
      const mapdata = {
        id: event.id,
        typeId: event.typeId,
        typeName: event.typeName,
        forwardLeave: event.forwardLeave,
        haveLeaveDays: leaveCount.valueHours,
        haveLeaveHours: leaveCount.valueMinute,
        limitLeave: limitLeave,
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
    return lastResult[0] ?? null;
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
  //   const leaveDaysByType = {};
  //   const leaveSummaryByType = leaveRecords.reduce((acc, item) => {
  //     const typeId = item.typeId;
  //     const hours = item.leaveHour || 0;
  //     if (!acc[typeId]) {
  //       acc[typeId] = hours;
  //     } else {
  //       acc[typeId] += hours;
  //     }
  //     return acc;
  //   }, {});
  //   for (const typeId in leaveSummaryByType) {
  //     const totalHours = leaveSummaryByType[typeId];
  //     if (totalHours >= 8) {
  //       const fullDays = Math.floor(totalHours / 8);
  //       const remaining = totalHours % 8;
  //       const hourRemain = Math.floor(remaining);
  //       const minuteRemain = Math.round((remaining % 1) * 60) === 30 ? 0.5 : 0;
  //       leaveDaysByType[typeId] = {
  //         total: totalHours,
  //         valueHours: fullDays, // จำนวนวัน
  //         valueMinute: hourRemain + minuteRemain, // นาทีที่เหลือ
  //       };
  //     } else {
  //       leaveDaysByType[typeId] = {
  //         total: totalHours,
  //         valueHours: 0,
  //         valueMinute: totalHours,
  //       };
  //     }
  //   }
  //   return leaveDaysByType;
  // }

  countLeavesByTypeIdMap(leaveRecords) {
    const leaveDaysByType = {};
    const targetYear = new Date().getFullYear();

    const leaveHoursByYear = leaveRecords.reduce((acc, item) => {
      const typeId = String(item.typeId);
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const leaveHour = item.leaveHour || 0;

      if (typeId === '6') {
        acc[typeId] ??= { total: 0 };

        acc[typeId].total += leaveHour;

        return acc;
      }

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      acc[typeId] ??= {};

      if (startYear === endYear) {
        acc[typeId][startYear] ??= 0;
        acc[typeId][startYear] += leaveHour;
      } else if (endYear === startYear + 1) {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const totalDays =
          Math.ceil((endDate.getTime() - startDate.getTime()) / MS_PER_DAY) + 1;
        const endOfStartYear = new Date(startYear, 11, 31);
        const daysInStartYear =
          Math.ceil(
            (endOfStartYear.getTime() - startDate.getTime()) / MS_PER_DAY,
          ) + 1;
        const startOfEndYear = new Date(endYear, 0, 1);
        const daysInEndYear =
          Math.ceil(
            (endDate.getTime() - startOfEndYear.getTime()) / MS_PER_DAY,
          ) + 1;
        const hoursInStartYear = (leaveHour * daysInStartYear) / totalDays;
        const hoursInEndYear = (leaveHour * daysInEndYear) / totalDays;
        acc[typeId][startYear] ??= 0;
        acc[typeId][startYear] += hoursInStartYear;
        acc[typeId][endYear] ??= 0;
        acc[typeId][endYear] += hoursInEndYear;
      }

      return acc;
    }, {});

    const leaveSummaryByType = {};
    for (const typeId in leaveHoursByYear) {
      if (typeId === '6') {
        leaveSummaryByType[typeId] = leaveHoursByYear[typeId].total || 0;
        continue;
      }
      if (leaveHoursByYear[typeId][targetYear]) {
        leaveSummaryByType[typeId] = leaveHoursByYear[typeId][targetYear];
      }
    }

    for (const typeId in leaveSummaryByType) {
      const totalHours = leaveSummaryByType[typeId];
      if (totalHours >= 8) {
        const fullDays = Math.floor(totalHours / 8);
        const remaining = totalHours % 8;

        const hourRemain = Math.floor(remaining);
        const minuteRemain = Math.round((remaining % 1) * 60) === 30 ? 0.5 : 0;
        leaveDaysByType[typeId] = {
          total: totalHours,
          valueHours: fullDays,
          valueMinute: hourRemain + minuteRemain,
        };
      } else {
        leaveDaysByType[typeId] = {
          total: totalHours,
          valueHours: 0,
          valueMinute: totalHours,
        };
      }
    }

    return leaveDaysByType;
  }

  // countLeavesByTypeIdMap(leaveRecords) {
  //   const leaveDaysByType = {};
  //   const targetYear = new Date().getFullYear();
  //   // แยกชั่วโมงการลาตามปีก่อน
  //   const leaveHoursByYear = leaveRecords.reduce((acc, item) => {
  //     const typeId = item.typeId;
  //     const startDate = new Date(item.startDate);
  //     const endDate = new Date(item.endDate);
  //     const leaveHour = item.leaveHour || 0;

  //     const startYear = startDate.getFullYear();
  //     const endYear = endDate.getFullYear();

  //     if (!acc[typeId]) {
  //       acc[typeId] = {};
  //     }

  //     if (startYear === endYear) {
  //       // กรณีการลาอยู่ในปีเดียวกัน
  //       const year = startYear;
  //       if (!acc[typeId][year]) {
  //         acc[typeId][year] = 0;
  //       }
  //       acc[typeId][year] += leaveHour;
  //     }
  //     // กรณีการลาคาบเกี่ยว 2 ปี
  //     else if (endYear === startYear + 1) {
  //       // คำนวณสัดส่วนการลาในแต่ละปี
  //       const totalDays =
  //         Math.ceil(
  //           (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  //         ) + 1;

  //       // หาจำนวนวันในปีแรก (จาก startDate ถึงสิ้นปี)
  //       const endOfStartYear = new Date(startYear, 11, 31); // 31 ธันวาคม
  //       const daysInStartYear =
  //         Math.ceil(
  //           (endOfStartYear.getTime() - startDate.getTime()) /
  //             (1000 * 60 * 60 * 24),
  //         ) + 1;

  //       // หาจำนวนวันในปีถัดไป (จากต้นปีถึง endDate)
  //       const startOfEndYear = new Date(endYear, 0, 1); // 1 มกราคม
  //       const daysInEndYear =
  //         Math.ceil(
  //           (endDate.getTime() - startOfEndYear.getTime()) /
  //             (1000 * 60 * 60 * 24),
  //         ) + 1;

  //       // แบ่งชั่วโมงตามสัดส่วน
  //       const hoursInStartYear = (leaveHour * daysInStartYear) / totalDays;
  //       const hoursInEndYear = (leaveHour * daysInEndYear) / totalDays;

  //       // เก็บข้อมูลในปีแรก
  //       if (!acc[typeId][startYear]) {
  //         acc[typeId][startYear] = 0;
  //       }
  //       acc[typeId][startYear] += hoursInStartYear;

  //       // เก็บข้อมูลในปีถัดไป
  //       if (!acc[typeId][endYear]) {
  //         acc[typeId][endYear] = 0;
  //       }
  //       acc[typeId][endYear] += hoursInEndYear;
  //     }

  //     return acc;
  //   }, {});

  //   // คำนวณผลลัพธ์สำหรับปีที่ต้องการ
  //   const leaveSummaryByType = {};
  //   for (const typeId in leaveHoursByYear) {
  //     if (leaveHoursByYear[typeId][targetYear]) {
  //       leaveSummaryByType[typeId] = leaveHoursByYear[typeId][targetYear];
  //     }
  //   }

  //   // แปลงชั่วโมงเป็นวันและชั่วโมง
  //   for (const typeId in leaveSummaryByType) {
  //     const totalHours = leaveSummaryByType[typeId];
  //     if (totalHours >= 8) {
  //       const fullDays = Math.floor(totalHours / 8);
  //       const remaining = totalHours % 8;
  //       const hourRemain = Math.floor(remaining);
  //       const minuteRemain = Math.round((remaining % 1) * 60) === 30 ? 0.5 : 0;
  //       leaveDaysByType[typeId] = {
  //         total: totalHours,
  //         valueHours: fullDays, // จำนวนวัน
  //         valueMinute: hourRemain + minuteRemain, // ชั่วโมงและนาทีที่เหลือ
  //       };
  //     } else {
  //       leaveDaysByType[typeId] = {
  //         total: totalHours,
  //         valueHours: 0,
  //         valueMinute: totalHours,
  //       };
  //     }
  //   }

  //   return leaveDaysByType;
  // }

  // ฟังก์ชันเสริมสำหรับดูข้อมูลการลาทุกปี
  countLeavesByTypeIdMapAllYears(leaveRecords) {
    const leaveDaysByTypeAndYear = {};

    // แยกชั่วโมงการลาตามปี
    const leaveHoursByYear = leaveRecords.reduce((acc, item) => {
      const typeId = item.typeId;
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const leaveHour = item.leaveHour || 0;

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      if (!acc[typeId]) {
        acc[typeId] = {};
      }

      // กรณีการลาอยู่ในปีเดียวกัน
      if (startYear === endYear) {
        const year = startYear;
        if (!acc[typeId][year]) {
          acc[typeId][year] = 0;
        }
        acc[typeId][year] += leaveHour;
      }
      // กรณีการลาคาบเกี่ยว 2 ปี
      else if (endYear === startYear + 1) {
        const totalDays =
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1;
        const endOfStartYear = new Date(startYear, 11, 31);
        const daysInStartYear =
          Math.ceil(
            (endOfStartYear.getTime() - startDate.getTime()) /
              (1000 * 60 * 60 * 24),
          ) + 1;
        const startOfEndYear = new Date(endYear, 0, 1);
        const daysInEndYear =
          Math.ceil(
            (endDate.getTime() - startOfEndYear.getTime()) /
              (1000 * 60 * 60 * 24),
          ) + 1;

        const hoursInStartYear = (leaveHour * daysInStartYear) / totalDays;
        const hoursInEndYear = (leaveHour * daysInEndYear) / totalDays;

        if (!acc[typeId][startYear]) {
          acc[typeId][startYear] = 0;
        }
        acc[typeId][startYear] += hoursInStartYear;

        if (!acc[typeId][endYear]) {
          acc[typeId][endYear] = 0;
        }
        acc[typeId][endYear] += hoursInEndYear;
      }

      return acc;
    }, {});

    // แปลงผลลัพธ์สำหรับทุกปี
    for (const typeId in leaveHoursByYear) {
      leaveDaysByTypeAndYear[typeId] = {};
      for (const year in leaveHoursByYear[typeId]) {
        const totalHours = leaveHoursByYear[typeId][year];
        if (totalHours >= 8) {
          const fullDays = Math.floor(totalHours / 8);
          const remaining = totalHours % 8;
          const hourRemain = Math.floor(remaining);
          const minuteRemain =
            Math.round((remaining % 1) * 60) === 30 ? 0.5 : 0;
          leaveDaysByTypeAndYear[typeId][year] = {
            total: totalHours,
            valueHours: fullDays,
            valueMinute: hourRemain + minuteRemain,
          };
        } else {
          leaveDaysByTypeAndYear[typeId][year] = {
            total: totalHours,
            valueHours: 0,
            valueMinute: totalHours,
          };
        }
      }
    }

    return leaveDaysByTypeAndYear;
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
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    const result = await this.accessService.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_LEAVE,
      getUser.userId,
    );
    return result;
  }

  async findLeaveByUserId(userId: string) {
    const accessedUserIds = await this.accessService.getOwnerGroupByUserId(
      userId,
    );

    if (accessedUserIds) {
      let currentGroupId = accessedUserIds.groupId;
      while (currentGroupId) {
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
    const findDataLeave = await this.dataleaveRepo.findOne({
      where: { id: condition.where.id },
    });
    const findDetailUser = await this.usersRepo.findOne({
      where: { userId: findDataLeave.userId },
    });
    const findleaveDetail = await this.dataleaveRepo.findOne({
      where: { id: condition.where.id },
    });

    const base = {
      where: { id: condition.where.id },
      data: {
        status: condition.data.status,
        userApproved: condition.data.userApproved,
        approvedDate: condition.data.approvedDate,
        detailApproved: condition.data.detailApproved,
      },
    };
    const updateData = await this.dataleaveRepo.update(base);
    if (updateData && condition.data.status) {
      const status = String(condition.data.status);
      await this.emitter.dispatch('leave-result', {
        requesterUserId: findDataLeave.userId,
        refId: findDataLeave.id,
        event: status,
        title: `ใบลาของคุณ${this.approvalLabel(status)}`,
        message: `${findleaveDetail?.typeName ?? 'ลางาน'}`,
        path: '/page/leave-control-management/leave-history',
        mail: {
          subject: 'OSD Intranet ใบลาออนไลน์',
          html: await templateDataLeaveApproved(
            findDetailUser,
            status,
            condition.data,
            findleaveDetail,
          ),
        },
      });
    }
    return updateData;
  }

  async updatedetailLeave(condition: Prisma.dataLeaveUpdateArgs) {
    const findDataLeave = await this.dataleaveRepo.findOne({
      where: { id: condition.where.id },
    });
    const findDetailUser = await this.usersRepo.findOne({
      where: { userId: findDataLeave.userId },
    });
    const findleaveDetail = await this.dataleaveRepo.findOne({
      where: { id: condition.where.id },
    });
    console.log('condition', condition);
    console.log('findleaveDetail', findleaveDetail);
    const base = {
      where: { id: condition.where.id },
      data: {
        detail: condition.data.detail,
        leaveHour: condition.data.leaveHour,
        startDate: condition.data.startDate,
        endDate: condition.data.endDate,
        yearLeaveHour: condition.data.yearLeaveHour,
        usedLeaveHour: condition.data.usedLeaveHour,
        beforeLeaveHour: condition.data.beforeLeaveHour,
        afterLeaveHour: condition.data.afterLeaveHour,
        typeId: condition.data.typeId,
        typeName: condition.data.typeName,
        updatedBy: condition.data.updatedBy,
        commentUpdated: condition.data.commentUpdated,
      },
    };
    const updateData = await this.dataleaveRepo.update(base);
    if (updateData) {
      const logs = await this.logLeaveDataRepo.create({
        data: {
          leaveId: updateData.id,
          ownerName: updateData.ownerName,
          fullName: `${updateData.firstName} ${updateData.lastName}`,
          typeId: +condition.data.typeId,
          typeName: updateData.typeName,
          startDate: updateData.startDate,
          endDate: updateData.endDate,
          startTime: updateData.startTime,
          endTime: updateData.endTime,
          leaveHour: +condition.data.leaveHour,
          status: updateData.status,
          phoneNumber: updateData.phoneNumber,
          detail: updateData.detail,
          remark: updateData.commentUpdated,
          createdBy: updateData.updatedBy,
        },
      });
    }
    return updateData;
  }

  remove(id: number) {
    const dataLeaveid = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(dataLeaveid);
  }

}
