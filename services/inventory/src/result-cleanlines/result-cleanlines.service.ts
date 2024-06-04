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
      })),
    });
  }

  async findReport(query) {
    let startTrackDate;
    let endTrackDate;
    if (query.monthYear) {
      startTrackDate = this.startOfDate(
        query.monthYear[0].replace(/"/g, ''),
      ).toISOString();
      endTrackDate = this.endOfDate(
        query.monthYear[1].replace(/"/g, ''),
      ).toISOString();
    }
    let sql = `select
    rc.housekeeper_id,
    hk.housekeeper_name ,
    rc."result",
    count(rc."result") as score
  from
    result_cleanliness rc
  left join house_keeper hk on
    hk.housekeeper_id = rc.housekeeper_id
  where rc.wrapup_date between '${startTrackDate}' and '${endTrackDate}'`;
    query.result ? (sql += ` and rc."result" =${query.result}`) : ``;
    query.duration ? (sql += ` and rc.duration =${query.duration}`) : ``;
    sql += `group by
    rc.housekeeper_id,
    hk.housekeeper_name ,
    rc."result"
  order by
    rc.housekeeper_id`;
    const result = await prisma.$queryRaw(Prisma.raw(sql));
    return result;
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
