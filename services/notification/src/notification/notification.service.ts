import { Injectable } from '@nestjs/common';
import {
  NotificationRepository,
  NotificationSettingRepository,
  NotificationRecipientRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { NOTIFICATION_CATALOG } from '@inventory/share';
import { DEFAULT_THRESHOLDS } from './notification.constants';

/** จำนวนรายการล่าสุดที่ดึงให้ฟีด (dropdown + หน้า list) */
const FEED_LIMIT = 50;

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly settingRepo: NotificationSettingRepository,
    private readonly recipientRepo: NotificationRecipientRepository,
  ) {}

  // ==============================
  // ฟีดแจ้งเตือนรายผู้ใช้ (เว็บ)
  // ==============================

  /**
   * รายการแจ้งเตือนของผู้ใช้ 1 คน ใหม่→เก่า
   * @param userId รหัสผู้ใช้ผู้รับ
   * @param unreadOnly true = เฉพาะที่ยังไม่อ่าน
   */
  async findByUser(userId: string, unreadOnly = false) {
    const where: Prisma.notificationWhereInput = { userId };
    if (unreadOnly) where.isRead = false;
    return this.notificationRepo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: FEED_LIMIT,
    });
  }

  /** จำนวนที่ยังไม่อ่าน — ใช้กับ badge ที่กระดิ่ง */
  async unreadCount(userId: string) {
    const count = await this.notificationRepo.count({
      where: { userId, isRead: false },
    });
    return { count };
  }

  /** ทำเครื่องหมายอ่านแล้ว 1 รายการ */
  async markRead(id: number) {
    return this.notificationRepo.update({
      where: { id },
      data: { isRead: true },
    });
  }

  /** ทำเครื่องหมายอ่านแล้วทั้งหมดของผู้ใช้ */
  async markAllRead(userId: string) {
    return this.notificationRepo.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  // ==============================
  // ตั้งค่า (แอดมิน) — auto-seed ค่าเริ่มต้นถ้ายังไม่มี
  // ==============================

  /**
   * คืนการตั้งค่าของทั้ง 2 ประเภท โดยสร้างค่าเริ่มต้นให้อัตโนมัติถ้ายังไม่มี
   * (แทนการ seed แยก — เรียกครั้งแรกที่ไหนก็ได้จะได้ค่าครบ)
   */
  async getSettings() {
    await this.ensureDefaults();
    return this.settingRepo.findAll();
  }

  /** catalog ประเภทการแจ้งเตือนทั้งหมด (ให้หน้า setting ใช้ render + รู้ target/threshold) */
  getCatalog() {
    return NOTIFICATION_CATALOG;
  }

  /** อัปเดตการตั้งค่าของประเภทหนึ่ง (เปิด/ปิด ช่องทาง / threshold / target / module) */
  async updateSetting(
    alertType: string,
    data: Prisma.notificationSettingUpdateInput,
  ) {
    await this.ensureDefaults();
    return this.settingRepo.update({ where: { alertType }, data });
  }

  /**
   * สร้างแถวตั้งค่าเริ่มต้นถ้ายังไม่มี — idempotent, ยึดตาม catalog (แหล่งความจริงเดียว)
   * ค่า default (target/module/threshold) มาจาก catalog เพื่อให้พฤติกรรมเดิมคงเดิม
   */
  private async ensureDefaults() {
    for (const def of NOTIFICATION_CATALOG) {
      await this.settingRepo.upsert({
        where: { alertType: def.key },
        update: {},
        create: {
          alertType: def.key,
          enabled: true,
          emailEnabled: true,
          webEnabled: true,
          targetStrategy: def.defaultTarget,
          moduleCode: def.moduleCode ?? null,
          thresholds: def.hasThresholds ? DEFAULT_THRESHOLDS : [],
          notifyWhenExpiredDaily: def.hasThresholds ? true : false,
        },
      });
    }
  }

  // ==============================
  // รายชื่อผู้รับ (แอดมิน)
  // ==============================

  /** รายชื่อผู้รับ — ระบุ alertType เพื่อดูของประเภทนั้น (รวม global ที่ alertType = null) */
  async getRecipients(alertType?: string) {
    if (alertType) {
      return this.recipientRepo.findMany({
        where: { OR: [{ alertType }, { alertType: null }] },
        orderBy: { id: 'asc' },
      });
    }
    return this.recipientRepo.findAll();
  }

  /** เพิ่มผู้รับ — (userId, alertType) ซ้ำจะถูกกันด้วย unique constraint */
  async addRecipient(data: {
    userId: string;
    email: string;
    name?: string;
    alertType?: string;
  }) {
    return this.recipientRepo.create({ data });
  }

  async removeRecipient(id: number) {
    return this.recipientRepo.delete({ where: { id } });
  }
}
