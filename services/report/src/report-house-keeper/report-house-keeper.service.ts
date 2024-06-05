import { Injectable } from '@nestjs/common';
import { CreateReportHouseKeeperDto } from './dto/create-report-house-keeper.dto';
import { UpdateReportHouseKeeperDto } from './dto/update-report-house-keeper.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { ResultCleanlinessRepository } from '@inventory/share';
import { createExcelBuffer } from 'src/utils/excel.service';
const prisma = new PrismaClient();

@Injectable()
export class ReportHouseKeeperService {
  constructor(private resultCleanlinessRepo: ResultCleanlinessRepository) {}
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }

  create(createReportHouseKeeperDto: CreateReportHouseKeeperDto) {
    return 'This action adds a new reportHouseKeeper';
  }

  findAll() {
    return `This action returns all reportHouseKeeper`;
  }

  async findQuery(query) {
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

  async findExport(query) {
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
    const result = (await prisma.$queryRaw(Prisma.raw(sql))) as any;
    const transfer = (await result).map((d) => ({
      'ชื่อแม่บ้าน.': d.housekeeper_name,
      'คะแนน.':
        d.result === 1
          ? 'แย่มาก'
          : d.result === 2
          ? 'แย่'
          : d.result === 3
          ? 'ปานกลาง'
          : d.result === 4
          ? 'ดี'
          : 'ดีมาก',
      'จำนวน.': String(d.score).replace(/"/g, ''),
    }));
    return createExcelBuffer(transfer, 'คะแนนการทำงานแม่บ้าน');
  }

  findOne(id: number) {
    return `This action returns a #${id} reportHouseKeeper`;
  }

  update(id: number, updateReportHouseKeeperDto: UpdateReportHouseKeeperDto) {
    return `This action updates a #${id} reportHouseKeeper`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportHouseKeeper`;
  }
}
