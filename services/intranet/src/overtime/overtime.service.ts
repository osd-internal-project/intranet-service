import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  AccessService,
  MasterConfigTimeOtRepository,
  MasterHolidaysRepository,
  ModuleTypes,
  OverTimeRepository,
  UsersRepository,
} from '@inventory/share';
import * as dayjs from 'dayjs';
import { calculate } from './manage-cal';

@Injectable()
export class OverTimeService {
  constructor(
    private readonly overtimeRepo: OverTimeRepository,
    private readonly masterconfigtimeotRepo: MasterConfigTimeOtRepository,
    private readonly masterholidayRepo: MasterHolidaysRepository,
    private readonly userRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}
  async create(createDepartmentDto: Prisma.overtimeCreateInput) {
    const findConfigTimeOt = await this.masterconfigtimeotRepo.findAll();
    const workTimeValues = Object.values(findConfigTimeOt[0].partTimeCondition);

    const holiday = await this.masterholidayRepo.findMany({
      where: {
        masterHolidaysYear: {
          is: { holidaysYear: { equals: dayjs(new Date()).format('YYYY') } },
        },
      },
    });

    const filterHolidays = holiday.find(
      (event: any) =>
        dayjs(event.holidaysDate).locale('th').format('YYYY-MM-DD') ===
        dayjs(createDepartmentDto.dateStart).locale('th').format('YYYY-MM-DD'),
    );

    const result = workTimeValues.find(
      (entry) => entry.index === dayjs(createDepartmentDto.dateStart).day(),
    );
    const startTimeSplit = createDepartmentDto.startTime.split(':');
    const endTimeSplit = createDepartmentDto.endTime.split(':');
    const resultstartTimeSplit = result.startTime.split(':');
    const resultendTimeSplit = result.endTime.split(':');
    const OvertimeTime = result.startOt.split(':');
    const total = +resultendTimeSplit[0] - +startTimeSplit[0];
    const minStart = startTimeSplit[1] === '30' ? 0.5 : 0;
    const minEndTime = endTimeSplit[1] === '30' ? 0.5 : 0;
    const totalMin = minEndTime - minStart;

    const averageOnetime = 0;
    const averageTwotime = 0;
    const averageThreetimes = 0;
    const totalTime = 0;
    const breakTime = 0;
    const workingTime = 0;

    const cal = await calculate(
      filterHolidays,
      result,
      endTimeSplit,
      startTimeSplit,
      totalTime,
      breakTime,
      workingTime,
      resultstartTimeSplit,
      resultendTimeSplit,
      OvertimeTime,
      totalMin,
      averageThreetimes,
      averageTwotime,
      averageOnetime,
      total,
    );

    const base = {
      fullname: createDepartmentDto.fullname,
      userId: createDepartmentDto.userId,
      dateStart: createDepartmentDto.dateStart,
      partTimeType: createDepartmentDto.partTimeType,
      startTime: createDepartmentDto.startTime,
      endTime: createDepartmentDto.endTime,
      breakTime: String(cal.breakTime),
      workingTime: String(cal.workingTime),
      totalTime: String(cal.totalTime),
      detailWork: createDepartmentDto.detailWork,
      typeDate: result.typeDate === 'dayoff' ? 'day-off' : 'normall',
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
        result.typeDate === 'dayoff'
          ? [
              {
                timeRate: cal.averageOnetime,
                rate: result.intime,
                typeRate: 'intime',
                date: 'day-off',
              },
              {
                timeRate: cal.averageThreetimes,
                rate: result.overtime,
                typeRate: 'overtime',
                date: 'day-off',
              },
            ]
          : [
              {
                timeRate: cal.averageTwotime,
                rate: result.intime,
                date: 'normall',
                typeRate: 'intime',
              },
              {
                timeRate: cal.averageThreetimes,
                rate: result.overtime,
                date: 'normall',
                typeRate: 'overtime',
              },
            ],
    };
    const data = await this.overtimeRepo.create({ data: base });
    return { status: 200, data: data };
  }

  async findAll() {
    return await this.overtimeRepo.findMany({ orderBy: { id: 'asc' } });
  }
  async findById(userId: string, skip: number, take: number) {
    const findUser = await this.userRepo.findOne({
      where: { token: userId },
    });
    return await this.overtimeRepo.findMany({
      where: { userId: findUser.userId },
      orderBy: { id: 'asc' },
      take,
      skip,
    });
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
      ModuleTypes.INTRANET_APPROVE_OT,
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

  async findOne(id: string) {
    return await this.overtimeRepo.findFirst({ where: { overTimeID: id } });
  }

  async update(id: string, condition: Prisma.overtimeUpdateInput) {
    return await this.overtimeRepo.update({
      where: { overTimeID: id },
      data: condition,
    });
  }

  async remove(overTimeID: string) {
    return await this.overtimeRepo.deleteMany({
      where: { overTimeID: overTimeID },
    });
  }
}
