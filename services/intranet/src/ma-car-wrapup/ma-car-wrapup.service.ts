import { Injectable } from '@nestjs/common';
import { MaCarWrapupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { templateCarWrapup } from 'src/utils/template-booking-car';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import * as dayjs from 'dayjs';

@Injectable()
export class MaCarWrapupService {
  constructor(private readonly macarwrapupRepo: MaCarWrapupRepository) {}
  async create(data: Prisma.maCarWrapupCreateInput) {
    const maCarWrapup = await this.macarwrapupRepo.create({ data: data });

    return maCarWrapup;
  }

  async findAll(condition: Prisma.maCarWrapupFindManyArgs) {
    return await this.macarwrapupRepo.findMany({
      ...condition,
      orderBy: {
        id: 'asc',
      },
      include: { maCarWrapupImage: true },
    });
  }

  async findOne(carWrapupId: string) {
    const findone = {
      where: {
        carWrapupId: carWrapupId,
      },
      include: { maCarWrapupImage: true },
    };
    return await this.macarwrapupRepo.findOne(findone);
  }

  /**
   * ประวัติตรวจสภาพของรถ 1 คัน แบบแบ่งหน้า
   * ไม่ส่ง take = คืนทุกแถว (เผื่อ export) — ส่ง skip/take เพื่อแบ่งหน้า
   * @param carId รหัสรถ
   * @param skip จำนวนแถวที่ข้าม
   * @param take จำนวนแถวต่อหน้า
   * @returns { data, count } — data = แถวหน้าปัจจุบัน, count = จำนวนทั้งหมดของรถคันนี้
   */
  async findManyByCarId(carId: string, skip?: number, take?: number) {
    const where: Prisma.maCarWrapupWhereInput = { carId };
    const data = await this.macarwrapupRepo.findMany({
      where,
      include: { maCarWrapupImage: true },
      orderBy: { id: 'desc' },
      skip,
      take,
    });
    const count = await this.macarwrapupRepo.count({ where });
    return { data, count };
  }

  async update(carWrapupId: string, condition: Prisma.maCarWrapupUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
    } as Prisma.maCarWrapupUpdateArgs;
    const updatemacar = await this.macarwrapupRepo.update(base);

    return updatemacar;
  }

  remove(carWrapupId: string) {
    return this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }

  // ==============================
  // ✅ 2) ทุกวัน 09:30
  // ==============================
  @Cron('30 9 * * *', {
    timeZone: 'Asia/Bangkok',
  })
  async handleDailyAlert() {
    console.log('Running daily alert...');
    const today = dayjs().startOf('day');
    const daydiff = [30, 20, 15, 10, 5, 3, 2, 1];
    const dateConditions = daydiff.map((day) => {
      const targetDate = today.add(day, 'day');
      return {
        dateEnd: {
          gte: targetDate.toDate(),
          lte: targetDate.endOf('day').toDate(),
        },
      };
    });
    const data = await this.macarwrapupRepo.findMany({
      where: {
        status: false,
        nextCheckDate: true,
        OR: [
          ...dateConditions,
          {
            dateEnd: {
              lt: today.toDate(),
            },
          },
        ],
      },
    });
    console.log('Tasks found:', data.length);
    await this.sendMail(data);
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
    const html = await templateCarWrapup(recipients, data);
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
