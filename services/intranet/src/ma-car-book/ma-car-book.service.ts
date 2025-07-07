import { Injectable, Logger } from '@nestjs/common';
import {
  AccessService,
  MaCarBookRepository,
  ModuleTypes,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MaCarBookService {
  constructor(
    private readonly maCarBookRepository: MaCarBookRepository,
    private readonly accessServices: AccessService,
  ) {}

  async create(data: Prisma.maCarBookCreateInput) {
    return await this.maCarBookRepository.create({ data: data });
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

  update(id: number, data: Prisma.maCarBookUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.maCarBookUpdateArgs;
    return this.maCarBookRepository.update(condition);
  }

  remove(id: number) {
    const condition = { where: { id: id } } as Prisma.maCarBookDeleteArgs;
    return this.maCarBookRepository.delete(condition);
  }

  private async sendLeaveEmails(recipients: any[], data: any) {
    // const html = await templateDataLeave(data);
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
          subject: 'OSD Intranet ใบลาออนไลน์',
          text: '',
          // html,
        })
        .catch((err) => {
          console.error(`Failed to send mail to ${event.email}:`, err);
        });
    }
  }
  private async sendLeaveAprovedEmails(
    dataUsers: Prisma.usersWhereInput,
    status: any,
  ) {
    // const html = await templateDataLeaveApproved(dataUsers, status);
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
        subject: 'OSD Intranet ใบลาออนไลน์',
        text: '',
        // html,
      })
      .catch((err) => {
        console.error(`Failed to send mail to ${dataUsers.email}:`, err);
      });
  }
}
