import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  AccessService,
  MasterConfigTimeOtRepository,
  MasterHolidaysRepository,
  ModuleTypes,
  OverTimeRepository,
  UsersRepository,
  NotificationEmitterService,
  fmtThaiDate,
  approvalLabel,
} from '@inventory/share';
import * as dayjs from 'dayjs';
import { calculate } from './manage-cal';
import {
  templateOverTime,
  templateOverTimeApproved,
} from 'src/utils/template-booking-overtime';

@Injectable()
export class OverTimeService {
  constructor(
    private readonly overtimeRepo: OverTimeRepository,
    private readonly masterconfigtimeotRepo: MasterConfigTimeOtRepository,
    private readonly masterholidayRepo: MasterHolidaysRepository,
    private readonly userRepo: UsersRepository,
    private readonly accessService: AccessService,
    private readonly emitter: NotificationEmitterService,
  ) {}
  async create(createDepartmentDto: Prisma.overtimeCreateInput) {
    const findConfigTimeOt = await this.masterconfigtimeotRepo.findAll();
    const workTimeValues = Object.values(findConfigTimeOt[0].partTimeCondition);
    const masterHoliday = await this.masterholidayRepo.findMany({
      where: {
        holidaysDate: {
          gte: dayjs(createDepartmentDto.dateStart).startOf('day').toDate(),
          lte: dayjs(createDepartmentDto.dateStart).endOf('day').toDate(),
        },
      },
    });
    const result = workTimeValues.find(
      (entry) => entry.index === dayjs(createDepartmentDto.dateStart).day(),
    );
    const startTimeOt = createDepartmentDto.startTime;
    const endTimeOt = createDepartmentDto.endTime;
    const OvertimeTime = result.startOt;
    const startTimeWork = result.startTime;
    const endTimeWork = result.endTime;
    const typeDate =
      result.typeDate === 'dayoff' || masterHoliday.length > 0
        ? 'dayoff'
        : 'normall';
    const { totalTime, breakTime, workTime, inTime, overtime } =
      await calculate(
        startTimeOt,
        endTimeOt,
        OvertimeTime,
        typeDate,
        startTimeWork,
        endTimeWork,
      );

    const base = {
      fullname: createDepartmentDto.fullname,
      userId: createDepartmentDto.userId,
      dateStart: createDepartmentDto.dateStart,
      partTimeType: createDepartmentDto.partTimeType,
      startTime: createDepartmentDto.startTime,
      endTime: createDepartmentDto.endTime,
      breakTime: String(breakTime),
      workingTime: String(workTime),
      totalTime: String(totalTime),
      detailWork: createDepartmentDto.detailWork,
      typeDate:
        result.typeDate === 'dayoff' || masterHoliday.length > 0
          ? 'day-off'
          : 'normall',
      customerName: createDepartmentDto.customerName,
      checkTravelUpCountry: createDepartmentDto.checkTravelUpCountry,
      checkOvernight: createDepartmentDto.checkOvernight,
      checkTravelByCompanyCar: createDepartmentDto.checkTravelByCompanyCar,
      carName: createDepartmentDto.carName ? createDepartmentDto.carName : null,
      carId: createDepartmentDto.carId ? createDepartmentDto.carId : null,
      checkDistance: createDepartmentDto.checkDistance,
      phoneNumber: createDepartmentDto.phoneNumber,
      status: 'waiting',
      calculate:
        result.typeDate === 'dayoff' || masterHoliday.length > 0
          ? [
              {
                timeRate: inTime,
                rate: masterHoliday.length > 0 ? 1 : result.intime,
                typeRate: 'intime',
                date: 'day-off',
              },
              {
                timeRate: overtime,
                rate: masterHoliday.length > 0 ? 3 : result.overtime,
                typeRate: 'overtime',
                date: 'day-off',
              },
            ]
          : [
              {
                timeRate: inTime,
                rate: result.intime,
                typeRate: 'intime',
                date: 'normall',
              },
              {
                timeRate: overtime,
                rate: result.overtime,
                typeRate: 'overtime',
                date: 'normall',
              },
            ],
    };
    const data = await this.overtimeRepo.create({ data: base });
    if (data) {
      const header = await this.accessService.getLeadUsersByUserId(
        ModuleTypes.INTRANET_APPROVE_LEAVE,
        createDepartmentDto.userId,
      );
      const findUsers: any = await this.userRepo.findOne({
        where: {
          userId: createDepartmentDto.userId,
        },
      });
      const html = await templateOverTime(header, base, findUsers, '');
      await this.emitter.dispatch('ot-request', {
        requesterUserId: createDepartmentDto.userId,
        refId: (data as any).overTimeID ?? (data as any).id,
        event: 'created',
        title: `คำขอ OT รออนุมัติ: ${findUsers?.firstNameTh ?? ''} ${
          findUsers?.lastNameTh ?? ''
        }`.trim(),
        message: `OT ${fmtThaiDate((base as any).dateStart)}`,
        path: '/page/overtime/overtime-history',
        mail: { subject: 'OSD Intranet เบิกทำงานล่วงเวลา', html },
      });
    }
    return { status: 200, data: data };
  }

  async findAll() {
    return await this.overtimeRepo.findMany({ orderBy: { id: 'asc' } });
  }
  async findById(userId: string, skip: number, take: number) {
    const findUser = await this.userRepo.findOne({
      where: { token: userId },
    });
    const data = await this.overtimeRepo.findMany({
      where: { userId: findUser.userId },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    });
    const count = await this.overtimeRepo.count({
      where: { userId: findUser.userId },
    });
    return { data, count };
  }
  async findMany(
    condition: Prisma.overtimeCreateInput,
    skip: number,
    take: number,
    token: string,
  ) {
    let filter = {};
    if (condition && condition.fullname) {
      filter = { ...filter, fullname: { contains: condition.fullname } };
    }
    if (condition && condition.status) {
      filter = { ...filter, status: { contains: condition.status } };
    }
    if (condition && condition.typeDate) {
      filter = { ...filter, typeDate: { contains: condition.typeDate } };
    }
    if (condition && condition.dateStart) {
      filter = {
        ...filter,
        dateStart: {
          gte: dayjs(condition.dateStart[0]).startOf('day').toISOString(),
          lte: dayjs(condition.dateStart[1]).endOf('day').toISOString(),
        },
      };
    }

    const getUser = await this.userRepo.findOne({ where: { token: token } });
    const AccessedGroup = await this.accessService.getAccessedUsersByUserId(
      ModuleTypes.INTRANET,
      getUser.userId,
    );

    const userIds = AccessedGroup.map((event: any) => event.userId);
    const base = {
      where: {
        ...filter,
        userId: { in: userIds },
      },
      take: take,
      skip: skip,
      orderBy: { createdAt: 'desc' },
    } as Prisma.overtimeFindManyArgs;
    const result = await this.overtimeRepo.findMany(base);
    const count = await this.overtimeRepo.count({
      where: {
        ...filter,
        userId: { in: userIds },
      },
    });

    return { data: result, total: count };
  }
  async findByCalendar(
    query: { month: dayjs.Dayjs | Date | string },
    token: string,
  ) {
    const getUser = await this.userRepo.findOne({ where: { token: token } });
    const base = {
      where: {
        dateStart: {
          gte: dayjs(query.month).startOf('month').toDate(),
          lte: dayjs(query.month).endOf('month').toDate(),
        },
        userId: getUser.userId,
      },
    } as Prisma.overtimeFindManyArgs;
    const result = await this.overtimeRepo.findMany(base);

    return result;
  }

  async findManyByHr(
    condition: Prisma.overtimeCreateInput,
    skip: number,
    take: number,
    token: string,
  ) {
    let filter = {};

    if (condition && condition.fullname) {
      filter = { ...filter, fullname: { contains: condition.fullname } };
    }
    if (condition && condition.status) {
      filter = { ...filter, status: { contains: condition.status } };
    }
    if (condition && condition.typeDate) {
      filter = { ...filter, typeDate: { contains: condition.typeDate } };
    }
    if (condition && condition.dateStart) {
      filter = {
        ...filter,
        dateStart: {
          gte: dayjs(condition.dateStart[0]).startOf('day').toISOString(),
          lte: dayjs(condition.dateStart[1]).endOf('day').toISOString(),
        },
      };
    }

    const base = {
      where: {
        ...filter,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    } as Prisma.overtimeFindManyArgs;
    const result = await this.overtimeRepo.findMany(base);
    const count = await this.overtimeRepo.count({
      where: {
        ...filter,
      },
    });

    return { data: result, total: count };
  }

  async findOne(id: string) {
    return await this.overtimeRepo.findFirst({ where: { overTimeID: id } });
  }

  async update(id: string, condition: Prisma.overtimeUpdateInput) {
    const res = await this.overtimeRepo.update({
      where: { overTimeID: id },
      data: condition,
    });
    if (res) {
      const overtimeFind = await this.overtimeRepo.findFirst({
        where: { overTimeID: id },
      });
      const header = await this.accessService.getLeadUsersByUserId(
        ModuleTypes.INTRANET_APPROVE_LEAVE,
        overtimeFind.userId,
      );
      const findUsers: any = await this.userRepo.findOne({
        where: {
          userId: overtimeFind.userId,
        },
      });
      const status = String(condition.status);
      const html = await templateOverTimeApproved(
        overtimeFind,
        header,
        findUsers,
        status,
      );
      await this.emitter.dispatch('ot-result', {
        requesterUserId: overtimeFind.userId,
        refId: id,
        event: status,
        title: `คำขอ OT ของคุณ${approvalLabel(status)}`,
        message: `OT ${fmtThaiDate((overtimeFind as any).dateStart)}`,
        path: '/page/overtime/overtime-calendar',
        mail: { subject: 'OSD Intranet เบิกทำงานล่วงเวลา', html },
      });
    }
    return res;
  }

  async remove(overTimeID: string) {
    return await this.overtimeRepo.deleteMany({
      where: { overTimeID: overTimeID },
    });
  }

}
