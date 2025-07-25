import { DataLeaveRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { dateToStringThDayjs } from 'src/utils';
import {
  DataLeaveExcelTemplate,
  TemplateExcel,
} from 'src/utils/generate-excel';

@Injectable()
export class ReportDataLeaveService {
  constructor(private readonly dataleaveRepo: DataLeaveRepository) {}
  async export(params: { type: string; value: string }) {
    const { type, value } = params;
    let filter = {};
    if (type === 'fullname' && value) {
      const names = value.trim().split(' ').filter(Boolean);
      const orConditions = names.flatMap((word) => [
        {
          firstName: {
            contains: word,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: word,
            mode: 'insensitive',
          },
        },
      ]);
      filter = { ...filter, OR: orConditions };
    } else if (type === 'status') {
      filter = { ...filter, status: value };
    } else if (type === 'type_name') {
      filter = {
        ...filter,
        typeName: {
          contains: value,
          mode: 'insensitive',
        },
      };
    }
    const dataSources = await this.dataleaveRepo.findMany({
      where: { ...filter },
      orderBy: { userId: 'asc' },
    });
    const transfer = dataSources.map((data: Prisma.dataLeaveWhereInput) => ({
      'ชื่อ - นามสกุล': `${data.firstName} ${data.lastName}`,
      ตำแหน่ง: data.position,
      ประเภทการลา: data.typeName,
      วันที่ลา: `${dateToStringThDayjs(
        data.startDate as string,
      )} ถึง ${dateToStringThDayjs(data.endDate as string)}`,
      สถานะ:
        data.status === 'waiting'
          ? 'รอการอนุมัติ'
          : data.status === 'cancel'
          ? 'ยกเลิก'
          : data.status === 'approved'
          ? 'อนุมัติ'
          : 'UNKNOWN',
      ผู้อนุมัติ: data.userApproved,
      วันที่อนุมัติ: data.approvedDate,
      รายละเอียด: data.detail,
    }));
    return await DataLeaveExcelTemplate(transfer, 'report');
  }

  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
}
