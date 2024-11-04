import { Injectable } from '@nestjs/common';
import {
  MasterHolidaysRepository,
  MasterHolidaysYearRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { CreateMasterHolidayDto } from './dto/create-master-holiday.dto';

@Injectable()
export class MasterHolidaysService {
  constructor(
    private readonly masterHolidaysRepo: MasterHolidaysRepository,
    private readonly masterHolidaysYearRepo: MasterHolidaysYearRepository,
  ) {}

  async create(createMasterHolidayDto: CreateMasterHolidayDto) {
    return await this.masterHolidaysRepo.create({
      data: {
        holidaysName: createMasterHolidayDto.holidaysName,
        holidaysDate: new Date(createMasterHolidayDto.holidaysDate),
        masterHolidaysYear: {
          create: { holidaysYear: createMasterHolidayDto.holidaysYear },
        },
      },
    });
  }

  async findByYear(year: string) {
    return this.masterHolidaysRepo.findMany({
      where: {
        masterHolidaysYear: { is: { holidaysYear: { equals: year } } },
      },
    });
  }

  async findAll() {
    return await this.masterHolidaysRepo.findAll();
  }

  async findAllYear() {
    return await this.masterHolidaysYearRepo.findAll();
  }

  async findOne(id: number) {
    const condition = {
      where: {
        id: id,
      },
    };
    return await this.masterHolidaysRepo.findOne(condition);
  }

  async findMany(condition: Prisma.masterHolidaysFindManyArgs) {
    return await this.masterHolidaysRepo.findMany(condition);
  }

  async update(condition: Prisma.masterHolidaysUpdateArgs) {
    return await this.masterHolidaysRepo.update(condition);
  }

  async remove(id: number) {
    return await this.masterHolidaysRepo.delete({
      where: {
        id: id,
      },
    });
  }
}
