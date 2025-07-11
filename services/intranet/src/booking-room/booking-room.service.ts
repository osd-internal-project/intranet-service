import { Injectable } from '@nestjs/common';
import {
  AccessService,
  BookingRoomRepository,
  ModuleTypes,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';
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
  ) {}
  async create(data: Prisma.bookingRoomCreateInput) {
    const result = await this.accessService.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
      data.userId,
    );
    const condition = { data: data } as Prisma.bookingRoomCreateArgs;
    if (condition) {
      this.sendLeaveEmails(result, condition.data);
    }
    return this.bookingRoomRepository.create(condition);
  }

  async findAll(token: string) {
    const result = await this.bookingRoomRepository.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const count = result.length;
    return { data: result, count: count };
  }

  async findMany(skip: number, take: number, token: string, role: string) {
    const getUser = await this.usersRepo.findOne({ where: { token: token } });
    const getAccessUser: any[] =
      await this.accessService.getAccessedUsersByUserId(
        ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
        getUser.userId,
      );
    const condition = {
      skip,
      take,
    } as Prisma.bookingRoomFindFirstArgsBase;

    const count = await this.bookingRoomRepository.count({
      where: {
        ...(role !== 'admin'
          ? { userId: getUser.userId }
          : { userId: { in: getAccessUser.map((user) => user.userId) } }),
      },
    });

    const result = await this.bookingRoomRepository.findMany(condition);

    return { data: result, count: count };
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingRoom`;
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
    if (condition && condition.data.bookingStatus) {
      this.sendLeaveAprovedEmails(
        result,
        condition.data,
        String(condition.data.bookingStatus),
      );
    }
    return await this.bookingRoomRepository.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.bookingRoomDeleteArgs;
    return await this.bookingRoomRepository.delete(condition);
  }

  private async sendLeaveEmails(recipients: any[], data: any) {
    const html = await templateBookingRoom(data, recipients);
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'internalsupport@osd.co.th',
        pass: 'Internal-support@osd1234.',
      },
    });

    for (const event of recipients) {
      transporter
        .sendMail({
          from: '"admin Intranet" <internalsupport@osd.co.th>',
          to: `${event.email}`,
          subject: 'OSD Intranet จองห้องประชุมออนไลน์',
          text: '',
          html,
        })
        .catch((err) => {
          console.error(`Failed to send mail to ${event.email}:`, err);
        });
    }
    // transporter
    //   .sendMail({
    //     from: '"admin Intranet" <internalsupport@osd.co.th>',
    //     to: `wasmeej@osd.co.th`,
    //     subject: 'OSD Intranet จองห้องประชุมออนไลน์',
    //     text: '',
    //     html,
    //   })
    //   .catch((err) => {
    //     console.error(`Failed to send mail to wasmeej@osd.co.th:`, err);
    //   });
  }
  private async sendLeaveAprovedEmails(
    recipients: any[],
    dataUsers: any,
    status: string,
  ) {
    const html = await templateBookingRoomApproved(
      recipients,
      dataUsers,
      status,
    );
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'internalsupport@osd.co.th',
        pass: 'Internal-support@osd1234.',
      },
    });
    transporter
      .sendMail({
        from: '"admin Intranet" <internalsupport@osd.co.th>',
        to: `${dataUsers.email}`,
        subject: 'OSD Intranet จองห้องประชุมออนไลน์',
        text: '',
        html,
      })
      .catch((err) => {
        console.error(`Failed to send mail to ${dataUsers.email}:`, err);
      });
    // transporter
    //   .sendMail({
    //     from: '"admin Intranet" <internalsupport@osd.co.th>',
    //     to: `wasmeej@osd.co.th`,
    //     subject: 'OSD Intranet จองห้องประชุมออนไลน์',
    //     text: '',
    //     html,
    //   })
    //   .catch((err) => {
    //     console.error(`Failed to send mail to ${dataUsers.email}:`, err);
    //   });
  }
}
