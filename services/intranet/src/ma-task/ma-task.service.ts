import { Injectable } from '@nestjs/common';
import {
  AccessService,
  MaTaskFilesRepository,
  MaTaskRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import { templateMacar } from 'src/utils/template-booking-car';
import * as dayjs from 'dayjs';
@Injectable()
export class MaTaskService {
  constructor(
    private readonly maTaskRepo: MaTaskRepository,
    private readonly maTaskFilesRepo: MaTaskFilesRepository,
    private readonly accessService: AccessService,
  ) {}
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
  async create(data: Prisma.maTaskCreateInput) {
    const group = await this.accessService.getOwnerGroupByUserId(
      data.createdById,
    );
    const condition = {
      data: { ...data, ...(group && { ownerGroup: group.groupId }) },
    } as Prisma.maTaskCreateArgs;
    return this.maTaskRepo.create(condition);
  }

  findAll() {
    return this.maTaskRepo.findAll();
  }

  findOne(condition: Prisma.maTaskFindFirstArgs) {
    return this.maTaskRepo.findOne(condition);
  }
  async findOneById(id: number) {
    const task = await this.maTaskRepo.findOne({
      where: { id: id },
      include: { refTask: true, nextTask: true },
    });
    const imageList = await this.maTaskFilesRepo.findMany({
      where: {
        maTaskId: task.id,
        type: 'image',
      },
    });

    // Fetch the draft posts
    const fileList = await this.maTaskFilesRepo.findMany({
      where: {
        maTaskId: task.id,
        type: 'attend',
      },
    });
    return { ...task, fileList: fileList, imageList: imageList };
  }
  async findDataTable(query: any) {
    const { take, skip, typeid, maName, maDate, contact, maStatus } = query;
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
      take: +take,
      skip: +skip,
    });
    const count = await this.maTaskRepo.count({
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
    return { data: data, count: count };
  }

  async findRangeEvent(query: any) {
    const { start, end } = query;
    const data = await this.maTaskRepo.findMany({
      where: {
        ...(start &&
          end && {
            maDate: {
              gte: this.startOfDate(start),
              lte: this.endOfDate(end),
            },
          }),
      },
      orderBy: [{ createdAt: 'desc' }],
    });
    return data;
  }

  findMany(condition: Prisma.maTaskFindManyArgs) {
    return this.maTaskRepo.findMany(condition);
  }

  update(id: number, data: Prisma.maTaskUpdateInput) {
    return this.maTaskRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.maTaskRepo.delete({ where: { id: id } });
  }

  // ==============================
  // ✅ 1) ทุกวันจันทร์ (maDate ภายใน 30 วัน)
  // ==============================
  @Cron('0 9 * * 1', {
    timeZone: 'Asia/Bangkok',
  })
  async handleMondayAlert() {
    console.log('Running Monday alert...');
    const data = await this.maTaskRepo.findAll();
    const today = dayjs();
    const filtered = data.filter((item) => {
      const diff = dayjs(item.maDate).diff(today, 'day');
      console.log('data', item.maDate, 'diff', diff);

      return diff >= 0 && diff < 30;
    });
    if (filtered.length === 0) {
      console.log('No Monday alert');
      return;
    }
    await this.sendMail(filtered);
  }
  // ==============================
  // ✅ 2) ทุกวัน 10:30 (maDate ยังไม่ถึง)
  // ==============================
  @Cron('30 10 * * *', {
    timeZone: 'Asia/Bangkok',
  })
  async handleDailyAlert() {
    console.log('Running daily alert...');
    const data = await this.maTaskRepo.findAll();
    const today = dayjs();
    const filtered = data.filter((item) => {
      const diff = today.diff(dayjs(item.maDate), 'day');
      return diff < 0;
    });
    if (filtered.length === 0) {
      console.log('No daily alert');
      return;
    }

    await this.sendMail(filtered);
  }

  async sendMail(data: any[]) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'internalsupport@osd.co.th',
        pass: 'Internal-support@osd1234.',
      },
    });
    const recipients = [
      {
        email: 'wasmeej@osd.co.th',
        firstNameTh: 'วัสมี',
        lastNameTh: 'จาหลง',
      },
      {
        email: 'jakkitt@osd.co.th',
        firstNameTh: 'จักรกฤษณ์',
        lastNameTh: 'ทิพันธ์',
      },
    ];
    const html = await templateMacar(recipients, data);
    for (const user of recipients) {
      try {
        await transporter.sendMail({
          from: '"admin Intranet" <internalsupport@osd.co.th>',
          to: user.email,
          subject: 'OSD Intranet เช็คสภาพรถยนต์',
          html,
        });
        console.log(`✅ Sent to ${user.email}`);
      } catch (err) {
        console.error(`❌ Failed: ${user.email}`, err);
      }
    }
  }
}
