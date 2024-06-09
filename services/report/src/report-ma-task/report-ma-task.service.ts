import { Injectable } from '@nestjs/common';
import { MaTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { createExcelBuffer } from 'src/utils/excel.service';
import { dateToStringTh } from 'src/utils';
@Injectable()
export class ReportMaTaskService {
  constructor(private readonly maTaskRepo: MaTaskRepository) {}
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }

  async findExport(query: any) {
    const { typeid, maName, maDate, contact, maStatus } = query;
    const data = await this.maTaskRepo.findMany({
      where: {
        ...(typeid && { maTypeId: Number(typeid) }),
        ...(maName && { maName: { contains: maName } }),
        ...(maDate && {
          maDate: {
            gte: this.startOfDate(maDate[0]),
            lte: this.endOfDate(maDate[1]),
          },
        }),
        ...(contact && { contact: { contains: contact } }),
        ...(maStatus && { maStatus: maStatus }),
      },
      orderBy: [{ createdAt: 'desc' }],
    });
    const transfer = await data.map((d, i) => ({
      'No.': i + 1,
      'ประเภท MA': d.maTypeName,
      'ชื่อ MA': d.maName,
      วันนัดหมาย: d.maDate ? dateToStringTh(d.maDate) : '',
      สถานะ:
        d.maStatus === 'process'
          ? 'รอดำเนินการ'
          : d.maStatus === 'success'
          ? 'สำเร็จ'
          : 'ยกเลิก',
      ผู้นัดหมาย: d.contact ? d.contact : '',
      เนื้อหา: d.detail ? d.detail : '',
      วันที่ดำเนินการ: d.actionDate ? dateToStringTh(d.actionDate) : '',
      สรุปผลการดำเนินการ: d.solution ? d.solution : '',
    }));
    return await createExcelBuffer(transfer, 'รายงานการดำเนินการMA');
  }
}
