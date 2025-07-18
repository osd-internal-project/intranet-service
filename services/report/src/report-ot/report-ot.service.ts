import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OverTimeRepository } from '@inventory/share';
import { OvertimeExcelTemplate } from 'src/utils/generate-excel';

@Injectable()
export class ReportOtService {
  constructor(private readonly mataskRepository: OverTimeRepository) {}

  async export(params: any) {
    const { fullname, typeDate, dateStart } = params;
    const dataSources = await this.mataskRepository.findMany({
      where: {
        ...(fullname && { fullname: { contains: fullname } }),
        ...(typeDate && { typeDate: { contains: typeDate } }),
        ...(dateStart && {
          dateStart: {
            gte: this.startOfDate(dateStart[0]),
            lte: this.endOfDate(dateStart[1]),
          },
        }),
      },
    });
    console.log(dataSources[0].calculate);
    console.log(dataSources[0]);

    const transfer = dataSources.map((data: any, index: number) => ({
      ลำดับ: index + 1,
      'ชื่อ-นามสกุล': data.fullname,
      วันที่เริ่มงาน: data.dateStart
        ? new Date(data.dateStart).toLocaleDateString('th-TH')
        : '',
      ประเภทงาน: data.partTimeType === 'working' ? 'ทำงาน' : data.partTimeType,
      เวลาเริ่ม: data.startTime,
      เวลาสิ้นสุด: data.endTime,
      'เวลาพัก (ชั่วโมง)': data.breakTime,
      'เวลาทำงาน (ชั่วโมง)': data.workingTime,
      'เวลารวม (ชั่วโมง)': data.totalTime,
      รายละเอียดงาน: data.detailWork,
      ประเภทวัน: data.typeDate === 'normall' ? 'วันปกติ' : 'วันหยุด',
      ชื่อลูกค้า: data.customerName,
      เดินทางต่างจังหวัด: data.checkTravelUpCountry ? 'ใช่' : 'ไม่ใช่',
      ค้างคืน: data.checkOvernight ? 'ใช่' : 'ไม่ใช่',
      ใช้รถบริษัท: data.checkTravelByCompanyCar ? 'ใช่' : 'ไม่ใช่',
      ชื่อรถ: data.carName || '',
      รหัสรถ: data.carId || '',
      ระยะทาง: data.checkDistance || '',
      อื่นๆ: data.other || '',
      เบอร์โทรศัพท์: data.phoneNumber || '',
      สถานะ:
        data.status === 'waiting'
          ? 'รอดำเนินการ'
          : data.status === 'approved'
          ? 'อนุมัติแล้ว'
          : data.status === 'rejected'
          ? 'ไม่อนุมัติ'
          : data.status,
      วันที่อนุมัติ: data.approvedDate
        ? new Date(data.approvedDate).toLocaleDateString('th-TH')
        : '',
      ผู้อนุมัติ: data.approvedUser || '',
      รายละเอียดการอนุมัติ: data.approvedDetail || '',
      อัตราเวลาปกติ:
        data.calculate?.find((c: any) => c.typeRate === 'intime')?.rate || 0,
      ชั่วโมงเวลาปกติ:
        data.calculate?.find((c: any) => c.typeRate === 'intime')?.timeRate ||
        0,
      อัตราล่วงเวลา:
        data.calculate?.find((c: any) => c.typeRate === 'overtime')?.rate || 0,
      ชั่วโมงล่วงเวลา:
        data.calculate?.find((c: any) => c.typeRate === 'overtime')?.timeRate ||
        0,
    }));
    return await OvertimeExcelTemplate(transfer, 'รายงานการทำงานล่วงเวลา');
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
