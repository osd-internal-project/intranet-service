import { Injectable } from '@nestjs/common';
import {
  MasterConfigTimeOtRepository,
  OverTimeRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

import * as dayjs from 'dayjs';

@Injectable()
export class OverTimeService {
  constructor(
    private readonly overtimeRepo: OverTimeRepository,
    private readonly masterconfigtimeotRepo: MasterConfigTimeOtRepository,
  ) {}
  async create(createDepartmentDto: Prisma.overtimeCreateInput) {
    const findConfigTimeOt = await this.masterconfigtimeotRepo.findAll();
    const workTimeValues = Object.values(findConfigTimeOt[0].workTime);

    const result = workTimeValues.find(
      (entry) => entry.index === dayjs(createDepartmentDto.dateStart).day(),
    );
    const startTimeSplit = createDepartmentDto.startTime.split(':');
    const endTimeSplit = createDepartmentDto.endTime.split(':');
    const resultstartTimeSplit = result.startTime.split(':');
    const resultendTimeSplit = result.endTime.split(':');
    const total = +resultendTimeSplit[0] - +startTimeSplit[0];
    const minStart = startTimeSplit[1] === '30' ? 0.5 : 0;
    const minEndTime = endTimeSplit[1] === '30' ? 0.5 : 0;
    const totalMin = minEndTime - minStart;

    let averageOnetime = 0;
    let averageThreetimes = 0;

    console.log(totalMin);
    console.log(total);

    if (
      +startTimeSplit[0] >= +resultstartTimeSplit[0] &&
      +startTimeSplit[0] <= +resultendTimeSplit[0] &&
      +endTimeSplit[0] <= +resultendTimeSplit[0]
    ) {
      if (total > 4) {
        averageOnetime = total - 1 + totalMin;
      } else {
        averageOnetime = total + totalMin;
      }
    } else if (
      +startTimeSplit[0] >= +resultstartTimeSplit[0] &&
      +startTimeSplit[0] <= +resultendTimeSplit[0] &&
      +endTimeSplit[0] >= +resultendTimeSplit[0]
    ) {
      if (+endTimeSplit[0] >= 18) {
        if (total > 4) {
          averageOnetime = 18 - +startTimeSplit[0] - 1;
          averageThreetimes = +endTimeSplit[0] - 18 - 1;
        } else {
          averageOnetime = 18 - +startTimeSplit[0];
          averageThreetimes = +endTimeSplit[0] - 18;
        }
        //   averageOnetime = 18 - +startTimeSplit[0] - 1;
        //   averageThreetimes = +endTimeSplit[0] - 18 -1
        // } else {
        //   averageOnetime = 18 - +startTimeSplit[0];
        // }
      } else {
      }
    }
    console.log(averageOnetime);
    console.log(averageThreetimes);

    // return this.overtimeRepo.create({ data: createDepartmentDto });
    return { status: 200 };
  }

  async findAll() {
    return await this.overtimeRepo.findMany({ orderBy: { id: 'asc' } });
  }

  async findMany(
    condition: Prisma.overtimeFindManyArgs,
    take: number,
    skip: number,
  ) {
    condition = {
      ...condition,
      take: take,
      skip: skip,
    };
    return await this.overtimeRepo.findMany(condition);
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

  async remove(id: number) {
    return await `This action removes a #${id} department`;
  }
}
