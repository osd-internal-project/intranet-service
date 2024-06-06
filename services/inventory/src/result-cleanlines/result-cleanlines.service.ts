import { Injectable } from '@nestjs/common';
import { CreateResultCleanlineDto } from './dto/create-result-cleanline.dto';
import { UpdateResultCleanlineDto } from './dto/update-result-cleanline.dto';
import { ResultCleanlinessRepository } from '@inventory/share';
import * as moment from 'moment';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ResultCleanlinesService {
  constructor(private resultCleanlinessRepo: ResultCleanlinessRepository) {}

  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }

  create(createResultCleanlineDto: CreateResultCleanlineDto) {
    return this.resultCleanlinessRepo.createMany({
      data: createResultCleanlineDto.floor.map((item: number) => ({
        duration: createResultCleanlineDto.duration,
        result: createResultCleanlineDto.result,
        floorId: item,
        houseKeeperId: createResultCleanlineDto.housekeeper,
        wrapupDate: new Date(createResultCleanlineDto.wrapupDate),
        remark: createResultCleanlineDto.remark,
      })),
    });
  }

  findAll() {
    return this.resultCleanlinessRepo.findAll();
  }

  findMany(query: any) {
    const year = Number(query.year);
    const month = Number(query.month);
    const getFirstAndLastDayOfMonth = (year: number, month: number) => {
      const firstDay = moment([year, month])
        .startOf('month')
        .format('YYYY-MM-DD');
      const lastDay = moment([year, month]).endOf('month').format('YYYY-MM-DD');
      return { firstDay, lastDay };
    };
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
    return this.resultCleanlinessRepo.findMany({
      where: {
        wrapupDate: {
          gte: new Date(firstDay).toISOString(),
          lte: new Date(lastDay).toISOString(),
        },
      },
      select: {
        floors: { select: { floorName: true } },
        houseKeepers: { select: { houseKeepName: true } },
        result: true,
        duration: true,
        wrapupDate: true,
        remark: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} resultCleanline`;
  }

  update(id: number, updateResultCleanlineDto: UpdateResultCleanlineDto) {
    return `This action updates a #${id} resultCleanline`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultCleanline`;
  }
}
