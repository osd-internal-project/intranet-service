import {
  AccessService,
  DataLeaveRepository,
  ModuleTypes,
  UsersRepository,
} from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import { dateToStringThDayjs } from 'src/utils';
import {
  DataLeaveExcelTemplate,
  TemplateExcel,
} from 'src/utils/generate-excel';

/** สิทธิ์ที่เห็นข้อมูลการลาได้ทั้งบริษัท — ตรงกับ findGroup-hr ใน intranet service */
const FULL_ACCESS_ROLES = ['hr', 'admin'];

@Injectable()
export class ReportDataLeaveService {
  constructor(
    private readonly dataleaveRepo: DataLeaveRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}
  /**
   * สร้างไฟล์รายงานการลาตามสิทธิ์ของผู้เรียก
   * @param params เงื่อนไขการค้นหาเดียวกับที่ตารางบนหน้าจอใช้
   * @param token ค่า sub จาก token (ตรงกับ users.token)
   * @param roleCodes role code ที่ RolesGuard คำนวณไว้แล้ว
   */
  async export(params: any, token: string, roleCodes: string[]) {
    let filter = {} as Prisma.dataLeaveWhereInput;
    const { fullname, status, createdAt, leaveAt, typeName } = params;
    if (fullname) {
      const names = fullname.trim().split(' ').filter(Boolean);
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
    }
    if (status) {
      filter = { ...filter, status: status };
    }
    if (typeName) {
      filter = {
        ...filter,
        typeName: {
          contains: typeName,
          mode: 'insensitive',
        },
      };
    }
    if (createdAt) {
      filter = {
        ...filter,
        createdAt: {
          gte: dayjs(createdAt[0]).startOf('day').toDate(),
          lte: dayjs(createdAt[1]).endOf('day').toDate(),
        },
      };
    }
    if (leaveAt) {
      filter = {
        ...filter,
        startDate: { lte: dayjs(leaveAt[1]).endOf('day').toDate() },
        endDate: { gte: dayjs(leaveAt[0]).startOf('day').toDate() },
      };
    }
    // if (type === 'fullname' && value) {
    //   const names = value.trim().split(' ').filter(Boolean);
    //   const orConditions = names.flatMap((word) => [
    //     {
    //       firstName: {
    //         contains: word,
    //         mode: 'insensitive',
    //       },
    //     },
    //     {
    //       lastName: {
    //         contains: word,
    //         mode: 'insensitive',
    //       },
    //     },
    //   ]);
    //   filter = { ...filter, OR: orConditions };
    // } else if (type === 'status') {
    //   filter = { ...filter, status: value };
    // } else if (type === 'type_name') {
    //   filter = {
    //     ...filter,
    //     typeName: {
    //       contains: value,
    //       mode: 'insensitive',
    //     },
    //   };
    // }
    // scope ทับหลัง filter เสมอ กันผู้เรียกกรอง status เพื่อเลี่ยงข้อจำกัด (เหมือน findGroup)
    const scope = await this.buildUserScope(token, roleCodes);
    const dataSources = await this.dataleaveRepo.findMany({
      where: { ...filter, ...scope },
      orderBy: { userId: 'asc' },
    });
    // console.log(`data lenght :`, dataSources.length);
    const transfer = await Promise.all(
      dataSources.map((data: Prisma.dataLeaveWhereInput) => ({
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
      })),
    );
    Logger.log(`leave lenght :`, transfer.length);
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

  /** จำกัดขอบเขตให้เท่ากับตารางที่ผู้เรียกเห็นบนหน้าจอ — hr/admin เห็นทั้งหมด */
  private async buildUserScope(
    token: string,
    roleCodes: string[],
  ): Promise<Prisma.dataLeaveWhereInput> {
    if (roleCodes.some((code) => FULL_ACCESS_ROLES.includes(code))) {
      return {};
    }
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    if (!getUser) {
      return { groupId: { in: [] }, status: { in: ['approved', 'waiting'] } };
    }
    const accessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET_APPROVE_LEAVE,
      getUser.ownerGroupId,
    );
    return {
      groupId: { in: accessedGroup.map((event: any) => event.groupId) },
      status: { in: ['approved', 'waiting'] },
    };
  }

}
