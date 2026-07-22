import { Injectable, Logger } from '@nestjs/common';
import { CarActivityLogRepository } from '../repositories/carActivityLog.repository';
import { ACTION_LABEL } from './car-activity.constants';

/** ข้อมูลนำเข้าเพื่อบันทึก 1 กิจกรรมของรถ */
export interface CarActivityInput {
  carId: string;
  carName?: string;
  action: string; //ค่าใน CarActivityAction เช่น 'booking.approve'
  refId?: string | number; //id ของ record ต้นเรื่อง
  description?: string; //ถ้าไม่ระบุจะใช้ label ไทยจาก action
  detail?: any; //snapshot/payload (เก็บเป็น JSON)
  actorId?: string;
  actorName?: string;
}

/**
 * ตัวบันทึกกิจกรรมรถกลาง — ทุก service ของรถเรียก log() หลังเขียนข้อมูลสำเร็จ
 * ออกแบบให้ "ไม่ throw" เพื่อไม่ให้การบันทึก log ไปล้ม flow หลัก
 */
@Injectable()
export class CarActivityLogService {
  private readonly logger = new Logger(CarActivityLogService.name);

  constructor(private readonly repo: CarActivityLogRepository) {}

  /** บันทึก 1 กิจกรรม — type ดึงจาก prefix ของ action (car|booking|...) */
  async log(input: CarActivityInput): Promise<void> {
    if (!input.carId) return;
    const type = input.action.split('.')[0];
    try {
      await this.repo.create({
        data: {
          carId: input.carId,
          carName: input.carName,
          type,
          action: input.action,
          refId: input.refId != null ? String(input.refId) : undefined,
          description: input.description ?? ACTION_LABEL[input.action] ?? input.action,
          detail: input.detail ?? undefined,
          actorId: input.actorId,
          actorName: input.actorName,
        },
      });
    } catch (err) {
      // ห้ามให้ log ล้ม flow หลัก — แค่ log error ไว้
      this.logger.error(
        `car activity log failed (${input.action}, car ${input.carId})`,
        err as Error,
      );
    }
  }

  /**
   * ดึงประวัติกิจกรรมของรถ 1 คัน แบบแบ่งหน้า
   * @returns { data, count } ใหม่→เก่า
   */
  async findByCar(carId: string, skip?: number, take?: number) {
    const where = { carId };
    const data = await this.repo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
    const count = await this.repo.count({ where });
    return { data, count };
  }
}
