import { Injectable } from '@nestjs/common';
import { CreateMasterHolidayDto } from './dto/create-master-holiday.dto';
import { UpdateMasterHolidayDto } from './dto/update-master-holiday.dto';
import { MasterHolidaysRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterHolidaysService {
  constructor(private readonly masterHolidaysRepo: MasterHolidaysRepository) {}
  create(createMasterHolidayDto: CreateMasterHolidayDto) {
    return 'This action adds a new masterHoliday';
  }

  async findAll() {
    return await this.masterHolidaysRepo.findAll();
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
    const condition = {
      where: {
        id: id,
      },
    };
    return await this.masterHolidaysRepo.delete(condition);
  }
}
