import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  AccessService,
  MaCarBookRepository,
  MaCarRepository,
  ModuleTypes,
  UsersRepository,
  NotificationEmitterService,
  fmtThaiDate,
  CarActivityLogService,
  CarActivityAction,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import {
  templateCarBooikng,
  templateCarBooikngApproved,
  templateCarBooikngReturn,
} from 'src/utils/template-booking-car';

@Injectable()
export class MaCarBookService {
  private readonly logger = new Logger(MaCarBookService.name);

  constructor(
    private readonly maCarBookRepository: MaCarBookRepository,
    private readonly maCarRepository: MaCarRepository,
    private readonly accessServices: AccessService,
    private usersRepo: UsersRepository,
    private readonly emitter: NotificationEmitterService,
    private readonly activityLog: CarActivityLogService,
  ) {}

  /** map สถานะอนุมัติ → action ของ activity log */
  private bookingActionFromStatus(status?: string): string {
    switch (status) {
      case 'Approve':
        return CarActivityAction.BOOKING_APPROVE;
      case 'DisapProved':
        return CarActivityAction.BOOKING_REJECT;
      case 'Completed':
        return CarActivityAction.BOOKING_COMPLETE;
      case 'Cancel':
        return CarActivityAction.BOOKING_CANCEL;
      case 'Return':
        return CarActivityAction.BOOKING_RETURN;
      default:
        return CarActivityAction.BOOKING_APPROVE;
    }
  }

  /**
   * รถที่ว่างในช่วงเวลาที่เลือก
   * 2 ช่วงทับกันเมื่อ existing.start <= newEnd AND existing.end >= newStart
   * นับเฉพาะการจองที่ยัง "ถือครองรถ" (Process/Approve/Return) — ไม่นับ Cancel/DisapProved/Completed
   */
  async getAvailable(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.maCarRepository.findMany({
      where: {
        status: true,
        maCarBook: {
          none: {
            carBookApprovedStatus: { in: ['Process', 'Approve', 'Return'] },
            carBookStartDate: { lte: end },
            carBookEndDate: { gte: start },
          },
        },
      },
      orderBy: { id: 'asc' },
      include: { maCarFiles: true },
    } as Prisma.maCarFindManyArgs);
  }

  async create(data: Prisma.maCarBookCreateInput) {
    // ใช้ module code ของ "จองรถ" (เดิมใช้ของห้องประชุมโดยพลาด) เพื่อให้ตรงกับคิวอนุมัติจริง
    const result = await this.accessServices.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_BOOKING_CAR,
      data.createdById,
    );
    const findUsers = await this.usersRepo.findOne({
      where: {
        userId: data.createdById,
      },
    });
    // log payload ที่รับมาก่อนบันทึกลง DB เพื่อใช้ตรวจสอบเมื่อข้อมูลผิดพลาด
    this.logger.log(`[create] payload=${JSON.stringify(data)}`);
    const response = await await this.maCarBookRepository.create({
      data: data,
    });
    if (response) {
      const html = await templateCarBooikng(response, result, findUsers);
      await this.emitter.dispatch('car-request', {
        requesterUserId: String(data.createdById),
        refId: (response as any).id,
        event: 'created',
        title: `การจองรถรออนุมัติ: ${findUsers?.firstNameTh ?? ''} ${
          findUsers?.lastNameTh ?? ''
        }`.trim(),
        message: `${(response as any).carName ?? 'จองรถ'} ${fmtThaiDate(
          (response as any).carBookStartDate,
        )}`,
        path: '/page/macar/ma-car-management',
        mail: { subject: 'OSD Intranet จองรถยนต์ออนไลน์', html },
      });
      await this.activityLog.log({
        carId: response.carId,
        carName: (response as any).carName,
        action: CarActivityAction.BOOKING_CREATE,
        refId: (response as any).id,
        actorId: String(data.createdById ?? ''),
        actorName: `${findUsers?.firstNameTh ?? ''} ${
          findUsers?.lastNameTh ?? ''
        }`.trim(),
        detail: {
          startDate: (response as any).carBookStartDate,
          endDate: (response as any).carBookEndDate,
          place: (response as any).carBookPlace,
        },
      });
    }
    return response;
  }
  async findBytoken(token: string) {
    // const module = ModuleTypes.INTRANET;
    const user = await this.accessServices.findUserByToken(token);
    if (user) {
      return await this.maCarBookRepository.findMany({
        orderBy: { createdAt: 'asc' },
      });
    } else {
      Logger.debug('Not Found User');
      return [];
    }
  }
  async findCalendarBytoken(
    token: string,
    query: { month: Date | dayjs.Dayjs | string },
  ) {
    // const module = ModuleTypes.INTRANET;
    const user = await this.accessServices.findUserByToken(token);
    if (user) {
      return await this.maCarBookRepository.findMany({
        where: {
          carBookStartDate: {
            gte: dayjs(query.month).startOf('month').toDate(),
            lte: dayjs(query.month).endOf('month').toDate(),
          },
        },
        orderBy: { createdAt: 'asc' },
      });
    } else {
      Logger.debug('Not Found User');
      return [];
    }
  }
  findAll() {
    return this.maCarBookRepository.findAll();
  }

  async findMany(skip: number, take: number) {
    const data = await this.maCarBookRepository.findMany({
      include: {
        maCar: true,
      },
      orderBy: { id: 'desc' },
      skip: skip,
      take: take,
    });

    const count = await this.maCarBookRepository.count({});
    return { docs: data, total: count };
  }

  async findManyWithTakeSkip(
    params: {
      carBookApprovedStatus?: string;
      carBookStartDate?: Date | string;
      createdByName?: string;
    },
    token: string,
    module: string,
    skip: number,
    take: number,
  ) {
    console.log('skip', skip);
    console.log('take', take);
    console.log('params', params);

    const { carBookApprovedStatus, carBookStartDate, createdByName } =
      params || {};
    let filter = {};
    if (carBookApprovedStatus) {
      filter = {
        ...filter,
        carBookApprovedStatus: { contains: carBookApprovedStatus },
      };
    }
    if (carBookStartDate) {
      filter = {
        ...filter,
        carBookStartDate: {
          gte: this.startOfDate(carBookStartDate[0]),
          lte: this.endOfDate(carBookStartDate[1]),
        },
      };
    }
    if (createdByName) {
      filter = {
        ...filter,
        createdByName: { contains: createdByName },
      };
    }
    const user = await this.accessServices.findUserByToken(token);
    if (user) {
      const data = await this.maCarBookRepository.findMany({
        where: filter,
        include: {
          maCar: true,
          maCarBookImage: true,
          fuelTransaction: true,
        },
        orderBy: { id: 'desc' },
        skip: skip,
        take: take,
      });
      const count = await this.maCarBookRepository.count({ where: filter });
      return { docs: data, total: count };
    } else {
      Logger.debug('Not Found User');
      return { docs: [], total: 0 };
    }
  }
  /**
   * รายการจองของรถ 1 คัน แบบแบ่งหน้า
   * ไม่ส่ง take = คืนทุกแถว — ส่ง skip/take เพื่อแบ่งหน้า
   * @param carId รหัสรถ
   * @param skip จำนวนแถวที่ข้าม
   * @param take จำนวนแถวต่อหน้า
   * @returns { docs, total } — docs = แถวหน้าปัจจุบัน, total = จำนวนทั้งหมดของรถคันนี้
   */
  async findManyByCarId(carId: string, skip?: number, take?: number) {
    const where: Prisma.maCarBookWhereInput = { carId };
    const data = await this.maCarBookRepository.findMany({
      where,
      include: { maCar: true },
      orderBy: { id: 'desc' },
      skip,
      take,
    });
    const count = await this.maCarBookRepository.count({ where });
    return { docs: data, total: count };
  }

  async findManyId(id: string, skip: number, take: number) {
    const data = await this.maCarBookRepository.findMany({
      where: {
        createdById: id,
      },
      include: {
        maCar: true,
      },
      orderBy: {
        id: 'desc',
      },
      skip: skip,
      take: take,
    });
    const count = await this.maCarBookRepository.count({
      where: {
        createdById: id,
      },
    });
    return { docs: data, total: count };
  }

  async findManyAllId(id: string) {
    const data = await this.maCarBookRepository.findMany({
      where: {
        createdById: id,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return data;
  }

  async findOne(carId: string, query: Prisma.maCarBookWhereInput) {
    const whereClause: Prisma.maCarBookWhereInput = {
      carId: carId,
    };
    if (query.carBookStartDate && query.carBookEndDate) {
      const start = dayjs(
        query.carBookStartDate as string | Date,
      ).toISOString();
      const end = dayjs(query.carBookEndDate as string | Date).toISOString();
      whereClause.OR = [
        {
          carBookStartDate: {
            gte: start,
            lte: end,
          },
        },
        {
          carBookEndDate: {
            gte: start,
            lte: end,
          },
        },
      ];
    }

    const data = await this.maCarBookRepository.findOne({
      where: whereClause,
    });
    return data ? data : {};
  }

  createdById(createdById: string) {
    return this.maCarBookRepository.findMany({
      where: {
        createdById: createdById,
      },
      include: {
        fuelTransaction: true,
        maCar: {
          include: {
            maCarWrapup: true,
          },
        },

        maCarBookImage: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async update(
    id: number,
    data: Prisma.maCarBookUpdateInput,
    actorToken?: string,
  ) {
    await this.assertCancelAllowed(id, data, actorToken);
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.maCarBookUpdateArgs;
    const findUser = await this.usersRepo.findOne({
      where: { userId: String(data.createdById) },
    });
    const update = await this.maCarBookRepository.update(condition);
    if (data.createdById) {
      const result = await this.accessServices.getLeadUsersByUserId(
        ModuleTypes.INTRANET_APPROVE_BOOKING_CAR,
        String(data.createdById),
      );
      const status = String(data.carBookApprovedStatus);
      if (update && data.carBookApprovedStatus === 'Return') {
        // แจ้งกลับผู้อนุมัติ (พฤติกรรมเดิม) — เมลคืนรถ
        const html = await templateCarBooikngReturn(
          update,
          result,
          findUser,
          status,
        );
        await this.emitter.dispatch('car-return', {
          requesterUserId: String(data.createdById),
          refId: id,
          event: status,
          title: `แจ้งการรับคืนรถ`,
          message: `${(update as any).carName ?? 'รถ'}`,
          path: '/page/macar/ma-car-management',
          mail: { subject: 'OSD Intranet จองรถยนต์ออนไลน์', html },
        });
      } else if (
        update &&
        data.carBookApprovedStatus &&
        data.carBookApprovedStatus !== 'Return'
      ) {
        // แจ้งเจ้าของคำขอ — ผลอนุมัติ/ปฏิเสธ/ยกเลิก/รับคืน
        const html = await templateCarBooikngApproved(
          update,
          result,
          findUser,
          status,
        );
        await this.emitter.dispatch('car-result', {
          requesterUserId: String(data.createdById),
          refId: id,
          event: status,
          title: `การจองรถของคุณ${this.carStatusLabel(status)}`,
          message: `${(update as any).carName ?? 'จองรถ'}`,
          path: '/page/macar/ma-car',
          mail: { subject: 'OSD Intranet จองรถยนต์ออนไลน์', html },
        });
      }
    }
    // บันทึกกิจกรรมทุกครั้งที่มีการเปลี่ยนสถานะ (ไม่ผูกกับการแจ้งเตือน)
    if (update && data.carBookApprovedStatus) {
      await this.activityLog.log({
        carId: update.carId,
        carName: (update as any).carName,
        action: this.bookingActionFromStatus(
          String(data.carBookApprovedStatus),
        ),
        refId: id,
        actorId: (data as any).carBookApprovedById ?? undefined,
        actorName: (data as any).carBookApprovedByName ?? undefined,
        detail: { status: data.carBookApprovedStatus },
      });
    }
    return update;
  }

  /**
   * ยกเลิกใบจองได้เฉพาะเจ้าของใบจอง และเฉพาะใบที่ยังรออนุมัติ
   * สถานะอื่นเป็นเส้นทางของผู้อนุมัติ ยังไม่ตรวจในรอบนี้
   */
  private async assertCancelAllowed(
    id: number,
    data: Prisma.maCarBookUpdateInput,
    actorToken?: string,
  ) {
    if (data.carBookApprovedStatus !== 'Cancel') return;
    const existing = await this.maCarBookRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException('ไม่พบใบจองรถที่ต้องการยกเลิก');
    }
    // sub จาก UserInterceptor เป็น token ของ ID24 ต้อง resolve เป็น userId ก่อนเทียบเจ้าของ
    const actor = actorToken
      ? await this.accessServices.findUserByToken(actorToken)
      : null;
    if (!actor || existing.createdById !== actor.userId) {
      throw new ForbiddenException('ยกเลิกได้เฉพาะใบจองของตนเอง');
    }
    if (existing.carBookApprovedStatus !== 'Process') {
      throw new BadRequestException('ยกเลิกได้เฉพาะใบจองที่ยังรออนุมัติ');
    }
  }

  /** แปลงสถานะการจองรถเป็นข้อความไทยสำหรับหัวข้อแจ้งเตือน */
  private carStatusLabel(status: string): string {
    switch (status) {
      case 'Approve':
        return 'ได้รับการอนุมัติ';
      case 'DisapProved':
        return 'ถูกปฏิเสธ';
      case 'Completed':
        return ' - รับคืนแล้ว';
      case 'Cancel':
        return 'ถูกยกเลิก';
      default:
        return `: ${status}`;
    }
  }

  async remove(id: number) {
    const existing = await this.maCarBookRepository.findOne({ where: { id } });
    const condition = { where: { id: id } } as Prisma.maCarBookDeleteArgs;
    const res = await this.maCarBookRepository.delete(condition);
    if (existing?.carId) {
      await this.activityLog.log({
        carId: existing.carId,
        carName: (existing as any).carName,
        action: CarActivityAction.BOOKING_DELETE,
        refId: id,
      });
    }
    return res;
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
