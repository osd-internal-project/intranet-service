import {
  DataLeaveRepository,
  MasterTypeLeaveRepository,
  UsersRepository,
  AccessService,
  UserPermissionGroupRepository,
  UserGroupRepository,
  ModuleTypes,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';
import {
  templateDataLeave,
  templateDataLeaveApproved,
} from '../utils/template-booking-leave';

@Injectable()
export class DataLeaveService {
  constructor(
    private readonly dataleaveRepo: DataLeaveRepository,
    private readonly mastertypeLeaveRepo: MasterTypeLeaveRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
    private readonly userPermissionGroupRepo: UserPermissionGroupRepository,
    private userGroupRepo: UserGroupRepository,
  ) {}

  async create(condition: Prisma.dataLeaveCreateArgs) {
    const result = await this.accessService.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_LEAVE,
      condition.data.userId,
    );
    const leaveLetter = await this.dataleaveRepo.create(condition);
    if (leaveLetter) {
      this.sendLeaveEmails(result, condition.data);
    }
    return leaveLetter;
  }
  findAll() {
    return this.dataleaveRepo.findAll();
  }

  findOne(userId: string) {
    return this.dataleaveRepo.findOne({ where: { userId: userId } });
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

  async findGroup(userId: string, query: any) {
    let filter = {};
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
    const getUser = await this.usersRepo.findOne({ where: { userId: userId } });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET,
      getUser.ownerGroupId,
    );
    return await this.dataleaveRepo.findMany({
      where: {
        ...filter, // ✅ สลาย filter เข้าไปใน where
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
        status: { in: ['approved', 'waiting'] },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findGroupHr(userId: string, query: any) {
    let filter = {};
    if (query.type === 'fullname' && query.value) {
      const names = query.value.trim().split(' ').filter(Boolean); // แยกคำ เช่น ["วาสิษฐี", "มหาวรรณศรี"]

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
    return await this.dataleaveRepo.findMany({
      where: { ...filter },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findManyByCondition(params: any) {
    const base = {
      where: {
        ...params,
        ...(params.typeId && { typeId: +params.typeId }),
        status: {
          in: ['approved', 'waiting'],
        },
      },
      orderBy: { createdAt: 'desc' },
    } as Prisma.dataLeaveFindManyArgs;
    return await this.dataleaveRepo.findMany(base);
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
    const dataLeaveWrapup = await this.dataleaveRepo.findMany({
      where: {
        userId: userId,
        status: {
          in: ['approved', 'waiting'],
        },
        createdAt: {
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
    const leaveDaysByType = {};
    const leaveSummaryByType = leaveRecords.reduce((acc, item) => {
      const typeId = item.typeId;
      const hours = item.leaveHour || 0;
      if (!acc[typeId]) {
        acc[typeId] = hours;
      } else {
        acc[typeId] += hours;
      }
      return acc;
    }, {});
    for (const typeId in leaveSummaryByType) {
      const totalHours = leaveSummaryByType[typeId];
      if (totalHours >= 8) {
        const fullDays = Math.floor(totalHours / 8);
        const remaining = totalHours % 8;
        const hourRemain = Math.floor(remaining);
        const minuteRemain = Math.round((remaining % 1) * 60) === 30 ? 0.5 : 0;
        leaveDaysByType[typeId] = {
          total: totalHours,
          valueHours: fullDays, // จำนวนวัน
          valueMinute: hourRemain + minuteRemain, // นาทีที่เหลือ
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
    const findDataLeave = await this.dataleaveRepo.findOne({
      where: { id: condition.where.id },
    });
    const findDetailUser = await this.usersRepo.findOne({
      where: { userId: findDataLeave.userId },
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
      this.sendLeaveAprovedEmails(
        findDetailUser,
        String(condition.data.status),
        condition.data,
      );
    }
    return updateData;
  }

  remove(id: number) {
    const dataLeaveid = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(dataLeaveid);
  }

  private async sendLeaveEmails(recipients: any[], data: any) {
    const html = await templateDataLeave(data);
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'internalsupport@osd.co.th',
        pass: 'Internal-support@osd1234.',
      },
    });
    // for (const event of recipients) {
    transporter
      .sendMail({
        from: '"admin Intranet" <internalsupport@osd.co.th>',
        to: `wasmeej@osd.co.th`,
        subject: 'OSD Intranet ใบลาออนไลน์',
        text: '',
        html,
      })
      .catch((err) => {
        console.error(`Failed to send mail to wasmeej@osd.co.th:`, err);
      });
    // }
  }
  private async sendLeaveAprovedEmails(
    dataUsers: Prisma.usersWhereInput,
    status: string,
    data: Prisma.dataLeaveUpdateInput,
  ) {
    const html = await templateDataLeaveApproved(dataUsers, status, data);
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'internalsupport@osd.co.th',
        pass: 'Internal-support@osd1234.',
      },
    });
    transporter
      .sendMail({
        from: '"admin Intranet" <internalsupport@osd.co.th>',
        to: `${dataUsers.email}`,
        subject: 'OSD Intranet ใบลาออนไลน์',
        text: '',
        html,
      })
      .catch((err) => {
        console.error(`Failed to send mail to ${dataUsers.email}:`, err);
      });
  }
}
