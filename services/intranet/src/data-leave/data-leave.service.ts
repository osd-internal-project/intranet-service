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
import * as nodemailer from 'nodemailer';
import {
  templateDataLeave,
  templateDataLeaveApproved,
} from '../utils/template';

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
    // const leaveLetter = await this.dataleaveRepo.create(condition);
    const html = await templateDataLeave(condition.data);

    // if (leaveLetter) {
    //   const transporter = nodemailer.createTransport({
    //     host: 'smtp.office365.com', // ใช้ SMTP ของ Outlook (Microsoft 365)
    //     port: 587, // พอร์ตสำหรับ TLS (STARTTLS)
    //     secure: false, // ใช้ STARTTLS (ไม่ใช่ SSL ทันที)
    //     auth: {
    //       user: 'internalsupport@osd.co.th', // อีเมลผู้ส่ง
    //       pass: 'Internal-support@osd1234.', // รหัสผ่าน (หรือ App Password ถ้าเปิด 2FA)
    //     },
    //   });
    //   result.map(async (event: any) => {
    //     return await transporter.sendMail({
    //       from: '"admin Intranet" <internalsupport@osd.co.th>',
    //       to: `${event.email}`,
    //       subject: 'OSD Intranet ใบลาออนไลน์',
    //       text: '',
    //       html,
    //     });
    //   });
    // }
    // return leaveLetter;
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

  async findGroup(userId: string) {
    const getUser = await this.usersRepo.findOne({ where: { userId: userId } });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET,
      getUser.ownerGroupId,
    );
    return await this.dataleaveRepo.findMany({
      where: {
        groupId: { in: AccessedGroup.map((event: any) => event.groupId) },
        status: {
          in: ['approved', 'waiting'],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findGroupHr(userId: string) {
    return await this.dataleaveRepo.findMany({
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
      const trimmed = leaveCount.value
        ? Math.floor(leaveCount.value * 10) / 10
        : 0;
      if (yearOfWork <= 1) {
        limitLeaveLastResult = parseFloat(event.limitLeaveFour) - trimmed;
        limitLeave = Number(event.limitLeaveFour);
      } else if (yearOfWork < 3) {
        limitLeaveLastResult = parseFloat(event.limitLeaveOne) - trimmed;
        limitLeave = Number(event.limitLeaveOne);
      } else if (yearOfWork < 5) {
        limitLeaveLastResult = parseFloat(event.limitLeaveTwo) - trimmed;
        limitLeave = Number(event.limitLeaveTwo);
      } else {
        limitLeaveLastResult = parseFloat(event.limitLeaveThree) - trimmed;
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
        haveLeave: leaveCount.value,
        typeLeaveHour: leaveCount.type,
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
        leaveDaysByType[typeId] = {
          value: totalHours ? totalHours / 8 : 0,
          type: 'Days',
        };
      } else {
        leaveDaysByType[typeId] = {
          value: totalHours ? totalHours : 0,
          type: 'Hours',
        };
      }
    }
    // const result = leaveRecords.reduce((acc, record) => {
    //   const hours = record.leaveHour;
    //   console.log(hours);
    //   let CalculateLeaveHour = hours / 8;
    //   if (!acc[record.typeId]) {
    //     acc[record.typeId] = 0;
    //   }
    //   if (hours % 8 !== 0) {
    //     CalculateLeaveHour = Math.floor(CalculateLeaveHour) + (hours % 8) / 10;
    //   }
    //   acc[record.typeId] += CalculateLeaveHour;
    //   let leaveCount = acc[record.typeId];
    //   const calHours = parseFloat((leaveCount % 1).toFixed(1));
    //   if (calHours >= 0.8 && calHours <= 1) {
    //     leaveCount += 0.2;
    //   }
    //   acc[record.typeId] = leaveCount;
    //   acc[record.typeId] = parseFloat(leaveCount.toFixed(2));
    //   return acc;
    // }, {});
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
    const updateData = await this.dataleaveRepo.update(condition);
    if (updateData && condition.data.status) {
      const html = await templateDataLeaveApproved(
        findDataLeave,
        condition.data.status as string,
      );
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // ใช้ SMTP ของ Outlook (Microsoft 365)
        port: 587, // พอร์ตสำหรับ TLS (STARTTLS)
        secure: false, // ใช้ STARTTLS (ไม่ใช่ SSL ทันที)
        auth: {
          user: 'internalsupport@osd.co.th', // อีเมลผู้ส่ง
          pass: 'Internal-support@osd1234.', // รหัสผ่าน (หรือ App Password ถ้าเปิด 2FA)
        },
      });
      return await transporter.sendMail({
        from: '"admin Intranet" <internalsupport@osd.co.th>',
        to: `${findDetailUser.email}`,
        subject: 'OSD Intranet ใบลาออนไลน์',
        text: '',
        html,
      });
    }
    return updateData;
  }

  remove(id: number) {
    const dataLeaveid = { where: { id: id } } as Prisma.dataLeaveDeleteArgs;
    return this.dataleaveRepo.delete(dataLeaveid);
  }
}
