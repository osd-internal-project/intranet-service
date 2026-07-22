import { Injectable } from '@nestjs/common';
import {
  AccessService,
  BookingRoomRepository,
  ModuleTypes,
  UsersRepository,
  NotificationEmitterService,
  fmtThaiDate,
  approvalLabel,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import {
  templateBookingRoom,
  templateBookingRoomApproved,
} from 'src/utils/template-booking-room';

@Injectable()
export class BookingRoomService {
  constructor(
    private bookingRoomRepository: BookingRoomRepository,
    private usersRepo: UsersRepository,
    private accessService: AccessService,
    private readonly emitter: NotificationEmitterService,
  ) {}
  async create(data: Prisma.bookingRoomCreateInput) {
    const result = await this.accessService.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
      data.userId,
    );
    const condition = { data: data } as Prisma.bookingRoomCreateArgs;
    const created = await this.bookingRoomRepository.create(condition);
    if (created) {
      const html = await templateBookingRoom(condition.data, result);
      await this.emitter.dispatch('room-request', {
        requesterUserId: data.userId,
        refId: (created as any).id,
        event: 'created',
        title: `จองห้องประชุมรออนุมัติ`,
        message: `${(data as any).roomName ?? 'จองห้องประชุม'} ${fmtThaiDate(
          (data as any).startDate,
        )}`,
        path: '/page/bookingroom/booking-room-management',
        mail: { subject: 'OSD Intranet จองห้องประชุมออนไลน์', html },
      });
    }
    return created;
  }

  async findAll(token: string) {
    const result = await this.bookingRoomRepository.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const count = result.length;
    return { data: result, count: count };
  }

  async findMany(skip: number, take: number, token: string, role: string) {
    const condition = {
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    } as Prisma.bookingRoomFindFirstArgsBase;

    const count = await this.bookingRoomRepository.count({});

    const result = await this.bookingRoomRepository.findMany(condition);

    return { data: result, count: count };
  }

  async findCalendar(
    token: string,
    query: { month: dayjs.Dayjs | Date | string },
  ) {
    const condition = {
      where: {
        startDate: {
          gte: dayjs(query.month).startOf('month').toDate(),
          lte: dayjs(query.month).endOf('month').toDate(),
        },
        bookingStatus: { not: 'Reject' },
      },
      orderBy: { createdAt: 'desc' },
    } as Prisma.bookingRoomFindFirstArgsBase;
    const result = await this.bookingRoomRepository.findMany(condition);
    return result;
  }
  countBookingRoomCountByRoomAndRange(
    roomId: string,
    startDate: string,
    endDate: string,
  ) {
    return this.bookingRoomRepository.count({
      where: {
        roomId: roomId,
        bookingStatus: 'Approve',
        OR: [
          { startDate: { gte: new Date(startDate), lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate), lte: new Date(endDate) } },
          {
            startDate: { lte: new Date(startDate) },
            endDate: { gte: new Date(endDate) },
          },
        ],
      },
    });
  }
  async update(id: number, data: Prisma.bookingRoomUpdateInput) {
    const findBooking = await this.bookingRoomRepository.findOne({
      where: { id: id },
    });
    const result = await this.accessService.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
      findBooking.userId,
    );
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.bookingRoomUpdateArgs;
    const updated = await this.bookingRoomRepository.update(condition);
    if (updated && condition.data.bookingStatus) {
      const status = String(condition.data.bookingStatus);
      const html = await templateBookingRoomApproved(
        result,
        condition.data,
        status,
      );
      await this.emitter.dispatch('room-result', {
        requesterUserId: findBooking.userId,
        refId: id,
        event: status,
        title: `การจองห้องประชุมของคุณ${approvalLabel(status)}`,
        message: `${(updated as any).roomName ?? 'จองห้องประชุม'}`,
        path: '/page/bookingroom/booking-room',
        mail: { subject: 'OSD Intranet จองห้องประชุมออนไลน์', html },
      });
    }
    return updated;
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.bookingRoomDeleteArgs;
    return await this.bookingRoomRepository.delete(condition);
  }

}
