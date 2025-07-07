import { Injectable, Logger } from '@nestjs/common';
import {
  AccessService,
  MaCarBookRepository,
  ModuleTypes,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';
import {
  templateCarBooikng,
  templateCarBooikngApproved,
  templateCarBooikngReturn,
} from 'src/utils/template-booking-car';

@Injectable()
export class MaCarBookService {
  constructor(
    private readonly maCarBookRepository: MaCarBookRepository,
    private readonly accessServices: AccessService,
    private usersRepo: UsersRepository,
  ) {}

  async create(data: Prisma.maCarBookCreateInput) {
    const result = await this.accessServices.getLeadUsersByUserId(
      ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
      data.createdById,
    );
    const findUsers = await this.usersRepo.findOne({
      where: {
        userId: data.createdById,
      },
    });
    const response = await await this.maCarBookRepository.create({
      data: data,
    });
    if (response) {
      this.sendLeaveEmails(result, response, findUsers);
    }
    return response;
  }
  async findBytoken(token: string) {
    const module = ModuleTypes.INTRANET;
    const user = await this.accessServices.findUserByToken(token);
    if (user) {
      const accessUsers = await this.accessServices.getAccessedUsersByUserId(
        module,
        user.userId,
      );
      const userIds = accessUsers.map((user) => user.userId);
      console.log(`user length : ${userIds.length}`);
      return await this.maCarBookRepository.findMany({
        where: { createdById: { in: userIds } },
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
    token: string,
    module: string,
    skip: number,
    take: number,
  ) {
    const user = await this.accessServices.findUserByToken(token);
    if (user) {
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
    } else {
      Logger.debug('Not Found User');
      return { docs: [], total: 0 };
    }
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
        maCar: {
          include: {
            maCarWrapup: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async update(id: number, data: Prisma.maCarBookUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.maCarBookUpdateArgs;
    const update = await this.maCarBookRepository.update(condition);
    if (data.createdById) {
      const result = await this.accessServices.getLeadUsersByUserId(
        ModuleTypes.INTRANET_APPROVE_BOOKING_ROOM,
        String(data.createdById),
      );
      const findUsers = await this.usersRepo.findOne({
        where: {
          userId: String(data.createdById),
        },
      });
      if (update && data.carBookApprovedStatus === 'Return') {
        this.sendLeaveReturnEmails(
          result,
          update,
          findUsers,
          String(data.carBookApprovedStatus),
        );
      } else if (
        update &&
        data.carBookApprovedStatus &&
        data.carBookApprovedStatus !== 'Return'
      ) {
        this.sendLeaveAprovedEmails(
          result,
          update,
          findUsers,
          String(data.carBookApprovedStatus),
        );
      }
    }
    return update;
  }

  remove(id: number) {
    const condition = { where: { id: id } } as Prisma.maCarBookDeleteArgs;
    return this.maCarBookRepository.delete(condition);
  }

  private async sendLeaveEmails(
    recipients: any[],
    data: any,
    findUsers: Prisma.usersWhereInput,
  ) {
    const html = await templateCarBooikng(data, recipients, findUsers);
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
          subject: 'OSD Intranet จองรถออนไลน์',
          text: '',
          html,
        })
        .catch((err) => {
          console.error(`Failed to send mail to ${event.email}:`, err);
        });
    }
  }
  private async sendLeaveReturnEmails(
    recipients: any[],
    data: any,
    findUsers: Prisma.usersWhereInput,
    status: string,
  ) {
    const html = await templateCarBooikngReturn(
      data,
      recipients,
      findUsers,
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
    for (const event of recipients) {
      transporter
        .sendMail({
          from: '"admin Intranet" <internalsupport@osd.co.th>',
          to: `${event.email}`,
          subject: 'OSD Intranet จองรถออนไลน์',
          text: '',
          html,
        })
        .catch((err) => {
          console.error(`Failed to send mail to ${event.email}:`, err);
        });
    }
  }

  private async sendLeaveAprovedEmails(
    recipients: any[],
    data: any,
    findUsers: Prisma.usersWhereInput,
    status: string,
  ) {
    const html = await templateCarBooikngApproved(
      data,
      recipients,
      findUsers,
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
        to: `${findUsers.email}`,
        subject: 'OSD Intranet จองห้องประชุมออนไลน์',
        text: '',
        html,
      })
      .catch((err) => {
        console.error(`Failed to send mail to ${findUsers.email}:`, err);
      });
  }
}
