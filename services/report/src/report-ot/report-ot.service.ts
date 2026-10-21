import { Injectable } from '@nestjs/common';
import {
  AccessService,
  ModuleTypes,
  OverTimeRepository,
  UsersRepository,
} from '@inventory/share';
import { OvertimeExcelTemplate } from 'src/utils/generate-excel';

/** สิทธิ์ที่เห็น OT ได้ทั้งบริษัท — ตรงกับ find-many-hr ใน intranet service */
const FULL_ACCESS_ROLES = ['hr', 'admin'];

@Injectable()
export class ReportOtService {
  constructor(
    private readonly mataskRepository: OverTimeRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}

  /**
   * สร้างไฟล์รายงาน OT ตามสิทธิ์ของผู้เรียก
   * @param params เงื่อนไขการค้นหาเดียวกับที่ตารางบนหน้าจอใช้
   * @param token ค่า sub จาก token (ตรงกับ users.token)
   * @param roleCodes role code ที่ RolesGuard คำนวณไว้แล้ว
   */
  async export(params: any, token: string, roleCodes: string[]) {
    const { fullname, status, typeDate, dateStart } = params;
    const scope = await this.buildUserScope(token, roleCodes);
    const dataSources = await this.mataskRepository.findMany({
      where: {
        ...scope,
        ...(fullname && { fullname: { contains: fullname } }),
        ...(status && { status: { contains: status } }),
        ...(typeDate && { typeDate: { contains: typeDate } }),
        ...(dateStart && {
          dateStart: {
            gte: this.startOfDate(dateStart[0]),
            lte: this.endOfDate(dateStart[1]),
          },
        }),
      },
      orderBy: {
        userId: 'asc',
      },
    });

    const transfer = dataSources.map((data: any, index: number) => ({
      ลำดับ: index + 1,
      'ชื่อ-นามสกุล': data.fullname,
      วันที่สร้าง: new Date(data.createdAt).toLocaleDateString('th-TH'),
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
      ประเภทวัน: data.typeDate === 'normal' ? 'วันปกติ' : 'วันหยุด',
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
      'ชั่วโมง 1 เท่า':
        data.typeDate === 'day-off'
          ? data.calculate?.find((c: any) => c.typeRate === 'intime')
              ?.timeRate &&
            data.calculate?.find((c: any) => c.typeRate === 'intime')
              ?.timeRate != 0
            ? data.calculate?.find((c: any) => c.typeRate === 'intime')
                ?.timeRate
            : '-'
          : '-',
      'ชั่วโมง 1.5 เท่า':
        data.typeDate === 'normal'
          ? data.calculate?.find((c: any) => c.typeRate === 'overtime')
              ?.timeRate &&
            data.calculate?.find((c: any) => c.typeRate === 'overtime')
              ?.timeRate != 0
            ? data.calculate?.find((c: any) => c.typeRate === 'overtime')
                ?.timeRate
            : '-'
          : '-',
      'ชั่วโมง 3 เท่า':
        data.typeDate === 'day-off'
          ? data.calculate?.find((c: any) => c.typeRate === 'overtime')
              ?.timeRate &&
            data.calculate?.find((c: any) => c.typeRate === 'overtime')
              ?.timeRate != 0
            ? data.calculate?.find((c: any) => c.typeRate === 'overtime')
                ?.timeRate
            : '-'
          : '-',
    }));
    return await OvertimeExcelTemplate(transfer, 'รายงานการทำงานล่วงเวลา');
  }

  /** จำกัดขอบเขตให้เท่ากับตารางที่ผู้เรียกเห็นบนหน้าจอ — hr/admin เห็นทั้งหมด */
  private async buildUserScope(token: string, roleCodes: string[]) {
    if (roleCodes.some((code) => FULL_ACCESS_ROLES.includes(code))) {
      return {};
    }
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    if (!getUser) {
      return { userId: { in: [] as string[] } };
    }
    // ต้องตรงกับ overtime findMany — สิทธิ์ผู้อนุมัติชุดเดียวกับการลา
    const accessedUsers = await this.accessService.getAccessedUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_LEAVE,
      getUser.userId,
    );
    return { userId: { in: accessedUsers.map((event: any) => event.userId) } };
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
