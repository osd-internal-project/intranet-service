import { Injectable } from '@nestjs/common';
import { MaCarBookRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { EmailService } from '../Emailtranfer/email.service';
import { macarbook } from 'src/Emailtranfer/template/macarbook';

@Injectable()
export class MaCarBookService {
  constructor(
    private readonly maCarBookRepository: MaCarBookRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(data: Prisma.maCarBookCreateInput) {
    const condition = await this.maCarBookRepository.create({ data: data });
    const emailContent = macarbook(condition);
    await this.emailService.sendEmail(
      'your email', // email ที่ต้องการส่ง
      `การสร้าง Task ลำดับที่ ${condition.id}`, //อันนี้ไตเติ้ล
      emailContent, // เนื้อหาอันนี้จะเป็นการใช้ฟิวเข้าไป
    );
    return condition;
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

  async findOne(carId: string) {
    const data = await this.maCarBookRepository.findOne({
      where: { carId: carId },
    });
    return data;
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

  update(id: Number, data: Prisma.maCarBookUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.maCarBookUpdateArgs;
    return this.maCarBookRepository.update(condition);
  }

  remove(id: Number) {
    const condition = { where: { id: id } } as Prisma.maCarBookDeleteArgs;
    return this.maCarBookRepository.delete(condition);
  }
}
