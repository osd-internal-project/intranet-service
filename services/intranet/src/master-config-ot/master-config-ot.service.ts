import { Injectable } from '@nestjs/common';
import {
  MasterConfigTimeOtRepository,
  MasterHolidaysRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

@Injectable()
export class MasterConfigOvertimeService {
  constructor(
    private readonly masterconfigtimeotRepo: MasterConfigTimeOtRepository,
    private readonly masterholidayRepo: MasterHolidaysRepository,
  ) {}
  create(createDepartmentDto: Prisma.masterDataConfigTimeOTCreateInput) {
    return this.masterconfigtimeotRepo.create({ data: createDepartmentDto });
  }

  async findAll() {
    return await this.masterconfigtimeotRepo.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findMany(
    condition: Prisma.masterDataConfigTimeOTFindManyArgs,
    take: number,
    skip: number,
  ) {
    condition = {
      ...condition,
      take: take,
      skip: skip,
    };
    return await this.masterconfigtimeotRepo.findMany(condition);
  }

  async findOne(id: number) {
    return await this.masterconfigtimeotRepo.findFirst({
      where: { id: id },
    });
  }
  async findbyDate(date: string) {
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
        dayjs(date).locale('th').format('YYYY-MM-DD'),
    );
    const checkDate = await this.findAll();

    const resCheckDate = Object.values(checkDate[0].partTimeCondition).find(
      (item) => item.index === dayjs(date).day(),
    );
    return resCheckDate.typeDate === 'dayoff' || filterHolidays !== undefined
      ? 1
      : 0;
  }

  async update(
    id: number,
    condition: Prisma.masterDataConfigTimeOTUpdateInput,
  ) {
    console.log(id);
    console.log(condition);

    // return await this.masterconfigtimeotRepo.update({
    //   where: { id: id },
    //   data: condition,
    // });
  }

  async remove(id: number) {
    return await `This action removes a #${id} department`;
  }
}
