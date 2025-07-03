import { Injectable } from '@nestjs/common';
import { CreateReportMaDto } from './dto/create-report-ma.dto';
import { UpdateReportMaDto } from './dto/update-report-ma.dto';
import { TemplateExcel } from 'src/utils/generate-excel';
import { MaTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportMaService {
  constructor(private readonly mataskRepository: MaTaskRepository) {}

  async export(params: any) {
    const { typeid, maName, maDate, contact, maStatus } = params;
    const dataSources = await this.mataskRepository.findMany({
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
    });
    const transfer = dataSources.map(
      (data: Prisma.maTaskWhereInput, index: number) => ({
        No: index + 1,
        'ประเภท MA': data.maCategory,
        'ชื่อ MA': data.maName,
        วันที่นัดหมาย: data.maDate,
        สถานะ: data.maStatus,
        ผู้นัดหมาย: data.contact,
        วันที่สร้าง: data.createdAt,
        วันที่อัปเดต: data.updatedAt,
      }),
    );
    return await TemplateExcel(transfer, 'report');
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
