import { Injectable } from '@nestjs/common';
import { CreateResultCleanlineDto } from './dto/create-result-cleanline.dto';
import { UpdateResultCleanlineDto } from './dto/update-result-cleanline.dto';
import { ResultCleanlinessRepository } from '@inventory/share';
import * as moment from 'moment';

@Injectable()
export class ResultCleanlinesService {
  constructor(private resultCleanlinessRepo: ResultCleanlinessRepository) {}

  startOfDate(date: string) {
    const dateset = new Date(date).setUTCDate(1);
    return new Date(dateset).setUTCHours(0, 0, 0, 0);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCDate(31);
    return new Date(dateset).setUTCHours(23, 59, 59, 59);
  }
  create(createResultCleanlineDto: CreateResultCleanlineDto) {
    return this.resultCleanlinessRepo.create({
      data: {
        duration: createResultCleanlineDto.duration,
        result: createResultCleanlineDto.result,
        floorId: createResultCleanlineDto.floors,
        houseKeeperId: createResultCleanlineDto.houseKeepers,
        wrapupDate: new Date(createResultCleanlineDto.wrapupDate),
      },
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
