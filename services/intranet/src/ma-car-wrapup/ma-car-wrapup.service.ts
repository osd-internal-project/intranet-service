import { Injectable } from '@nestjs/common';
import {
  MaCarWrapupRepository,
  CarActivityLogService,
  CarActivityAction,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarWrapupService {
  constructor(
    private readonly macarwrapupRepo: MaCarWrapupRepository,
    private readonly activityLog: CarActivityLogService,
  ) {}
  async create(data: Prisma.maCarWrapupCreateInput) {
    const maCarWrapup = await this.macarwrapupRepo.create({ data: data });
    if (maCarWrapup?.carId) {
      await this.activityLog.log({
        carId: maCarWrapup.carId,
        carName: maCarWrapup.carName ?? undefined,
        action: CarActivityAction.WRAPUP_CREATE,
        refId: maCarWrapup.carWrapupId,
        actorName: maCarWrapup.createbyName ?? undefined,
        detail: { typeName: maCarWrapup.typeName, vender: maCarWrapup.vender },
      });
    }
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
    if (updatemacar?.carId) {
      await this.activityLog.log({
        carId: updatemacar.carId,
        carName: updatemacar.carName ?? undefined,
        action: CarActivityAction.WRAPUP_UPDATE,
        refId: carWrapupId,
      });
    }
    return updatemacar;
  }

  async remove(carWrapupId: string) {
    const existing = await this.macarwrapupRepo.findOne({
      where: { carWrapupId },
    });
    const res = await this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
    if (existing?.carId) {
      await this.activityLog.log({
        carId: existing.carId,
        carName: existing.carName ?? undefined,
        action: CarActivityAction.WRAPUP_DELETE,
        refId: carWrapupId,
      });
    }
    return res;
  }

  // หมายเหตุ: cron แจ้งเตือนตรวจสภาพรถ (เดิมทุกวัน 09:30 ส่งอีเมลหารายชื่อ hardcoded)
  // ถูกย้ายไปที่ service ใหม่ `notification-be` (services/notification) แล้ว
  // ซึ่งรองรับทั้งเว็บ+อีเมล, threshold ตั้งค่าได้ และรายชื่อผู้รับจัดการผ่านหน้าตั้งค่า
}
