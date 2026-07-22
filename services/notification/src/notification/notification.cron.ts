import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  MaCarDocumentRepository,
  MaCarWrapupRepository,
  NotificationRepository,
  NotificationRecipientRepository,
} from '@inventory/share';
import * as dayjs from 'dayjs';
import { NotificationService } from './notification.service';
import { NotificationMailer } from './notification.mailer';
import { NotificationMailItem } from '../utils/template-notification';
import {
  ALERT_TYPES,
  AlertType,
  DOC_TYPE_LABEL,
  daysUntil,
} from './notification.constants';

/** รายการที่ "ถึงเกณฑ์" แจ้งเตือนในรอบนี้ (ก่อนกระจายให้ผู้รับ) */
interface FiringItem {
  type: AlertType;
  refId: string;
  carId?: string;
  carName: string;
  categoryLabel: string;
  detail: string;
  daysLeft: number;
  level: 'warning' | 'expired';
  bucket: string; //'60' | '30' | 'expired:YYYY-MM-DD'
  path: string;
  title: string;
}

interface Recipient {
  userId: string;
  email: string;
  name: string | null;
}

@Injectable()
export class NotificationCronService {
  private readonly logger = new Logger(NotificationCronService.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationRepo: NotificationRepository,
    private readonly recipientRepo: NotificationRecipientRepository,
    private readonly maCarDocumentRepo: MaCarDocumentRepository,
    private readonly maCarWrapupRepo: MaCarWrapupRepository,
    private readonly mailer: NotificationMailer,
  ) {}

  /** ทุกวัน 09:00 (Asia/Bangkok) — สแกนเอกสารรถ + ตรวจสภาพรถ แล้วแจ้งเตือน */
  @Cron('0 9 * * *', { timeZone: 'Asia/Bangkok' })
  async handleDailyAlert() {
    this.logger.log('Running notification daily alert...');
    await this.runNow();
  }

  /**
   * ตรรกะหลัก แยกจาก @Cron เพื่อให้เรียกทดสอบ/รันเองได้
   * @param force true = บังคับยิงทุกรายการปัจจุบัน (ทดสอบ) ไม่สนใจ threshold และไม่ติด dedup
   * @returns สรุปจำนวนที่แจ้งเตือน (ใช้ตอนทดสอบ)
   */
  async runNow(force = false) {
    const settings = await this.notificationService.getSettings();
    const settingByType = new Map(settings.map((s) => [s.alertType, s]));

    // รายชื่อผู้รับแบบแยกตามประเภท (รวม global ที่ alertType = null) + cache
    const recipientCache = new Map<string, Recipient[]>();
    const recipientsFor = async (alertType: string): Promise<Recipient[]> => {
      if (!recipientCache.has(alertType)) {
        recipientCache.set(
          alertType,
          (await this.recipientRepo.findMany({
            where: { OR: [{ alertType }, { alertType: null }] },
          })) as Recipient[],
        );
      }
      return recipientCache.get(alertType);
    };

    // รวมรายการที่ถึงเกณฑ์จากทั้ง 2 ประเภท (ตามที่เปิดใช้งาน)
    const firing: FiringItem[] = [];
    const insSetting = settingByType.get(ALERT_TYPES.INSURANCE);
    if (insSetting?.enabled) {
      firing.push(
        ...(await this.scanInsurance(
          insSetting.thresholds,
          insSetting.notifyWhenExpiredDaily,
          force,
        )),
      );
    }
    const maSetting = settingByType.get(ALERT_TYPES.MA);
    if (maSetting?.enabled) {
      firing.push(
        ...(await this.scanMa(
          maSetting.thresholds,
          maSetting.notifyWhenExpiredDaily,
          force,
        )),
      );
    }

    // กระจายให้ผู้รับ + กันซ้ำด้วย dedupKey + เก็บรายการสำหรับอีเมล digest
    let created = 0;
    const mailQueue = new Map<
      string,
      { recipient: Recipient; items: NotificationMailItem[] }
    >();

    for (const item of firing) {
      const setting = settingByType.get(item.type);
      if (!setting) continue;
      const recipients = await recipientsFor(item.type);
      for (const r of recipients) {
        const dedupKey = `${r.userId}:${item.type}:${item.refId}:${item.bucket}`;
        const isNew = await this.createOnce(item, r, dedupKey, setting.webEnabled);
        if (!isNew) continue; //ยิงไปแล้วในรอบ/วันนี้
        created += 1;
        if (setting.emailEnabled) {
          if (!mailQueue.has(r.userId))
            mailQueue.set(r.userId, { recipient: r, items: [] });
          mailQueue.get(r.userId).items.push(this.toMailItem(item));
        }
      }
    }

    let emailed = 0;
    for (const { recipient, items } of mailQueue.values()) {
      await this.mailer.sendDigest(recipient.email, recipient.name ?? '', items);
      emailed += 1;
    }

    this.logger.log(
      `Notification done — firing:${firing.length} created:${created} emails:${emailed}`,
    );
    return { created, emailed };
  }

  /**
   * สร้างแถวแจ้งเตือน 1 รายการ กันซ้ำด้วย dedupKey (unique)
   * @returns true = สร้างใหม่ (ควรส่งอีเมล), false = มีอยู่แล้ว (ข้าม)
   * หมายเหตุ: ถ้า webEnabled = false จะตั้ง isRead = true เพื่อไม่ให้ขึ้น badge (โหมดอีเมลอย่างเดียว)
   */
  private async createOnce(
    item: FiringItem,
    r: Recipient,
    dedupKey: string,
    webEnabled: boolean,
  ): Promise<boolean> {
    try {
      await this.notificationRepo.create({
        data: {
          userId: r.userId,
          title: item.title,
          message: this.buildMessage(item),
          type: item.type,
          refId: item.refId,
          carId: item.carId,
          path: item.path,
          level: item.level,
          isRead: !webEnabled,
          dedupKey,
        },
      });
      return true;
    } catch (err: any) {
      if (err?.code === 'P2002') return false; //ซ้ำ — เคยยิงแล้ว
      this.logger.error(`create notification failed (${dedupKey})`, err);
      return false;
    }
  }

  /** สแกนเอกสารประกัน/พรบ./ภาษี — ใช้ตัวปัจจุบันของแต่ละ (carId, docType) */
  private async scanInsurance(
    thresholds: number[],
    notifyWhenExpiredDaily: boolean,
    force = false,
  ): Promise<FiringItem[]> {
    const docs = await this.maCarDocumentRepo.findMany({
      where: { status: true },
      orderBy: { expireDate: 'desc' },
    });

    // ตัวปัจจุบัน = แถว expireDate มากสุดของแต่ละ (carId, docType) — docs เรียง desc แล้ว
    const current = new Map<string, (typeof docs)[number]>();
    for (const d of docs) {
      const key = `${d.carId}:${d.docType}`;
      if (!current.has(key)) current.set(key, d);
    }

    const out: FiringItem[] = [];
    for (const d of current.values()) {
      const daysLeft = daysUntil(d.expireDate);
      const fired = this.resolveBucket(
        daysLeft,
        thresholds,
        notifyWhenExpiredDaily,
        force,
      );
      if (!fired) continue;
      const categoryLabel = DOC_TYPE_LABEL[d.docType] ?? d.docType;
      const carName = d.carName ?? d.carId;
      out.push({
        type: ALERT_TYPES.INSURANCE,
        refId: d.documentId,
        carId: d.carId,
        carName,
        categoryLabel,
        detail: [d.vender, d.policyNo].filter(Boolean).join(' • ') || '-',
        daysLeft,
        level: fired.level,
        bucket: fired.bucket,
        path: '/page/macar/ma-car-insurance',
        title: `${categoryLabel}รถ ${carName} ${this.dueLabel(daysLeft)}`,
      });
    }
    return out;
  }

  /** สแกนงานตรวจสภาพรถ — เฉพาะที่ยังไม่ปิดงานและตั้งเตือนรอบถัดไป */
  private async scanMa(
    thresholds: number[],
    notifyWhenExpiredDaily: boolean,
    force = false,
  ): Promise<FiringItem[]> {
    const rows = await this.maCarWrapupRepo.findMany({
      where: { status: false, nextCheckDate: true },
    });

    const out: FiringItem[] = [];
    for (const w of rows) {
      const daysLeft = daysUntil(w.dateEnd);
      const fired = this.resolveBucket(
        daysLeft,
        thresholds,
        notifyWhenExpiredDaily,
        force,
      );
      if (!fired) continue;
      const carName = w.carName ?? w.carId ?? '-';
      out.push({
        type: ALERT_TYPES.MA,
        refId: w.carWrapupId,
        carId: w.carId ?? undefined,
        carName,
        categoryLabel: 'ตรวจสภาพรถ',
        detail: [w.typeName, w.vender].filter(Boolean).join(' • ') || '-',
        daysLeft,
        level: fired.level,
        bucket: fired.bucket,
        path: '/page/macar/management-car-wrapup',
        title: `ตรวจสภาพรถ ${carName} ${this.dueLabel(daysLeft)}`,
      });
    }
    return out;
  }

  /**
   * ตัดสินว่ารายการนี้ควรแจ้งเตือนไหม และอยู่ bucket ไหน
   * - เลยกำหนด (daysLeft < 0): แจ้งทุกวันถ้าเปิด notifyWhenExpiredDaily — bucket ผูกกับวันที่
   * - ถึง milestone พอดี (daysLeft === threshold): แจ้งครั้งเดียว — bucket = จำนวนวัน
   */
  private resolveBucket(
    daysLeft: number | null,
    thresholds: number[],
    notifyWhenExpiredDaily: boolean,
    force = false,
  ): { bucket: string; level: 'warning' | 'expired' } | null {
    if (daysLeft === null) return null;
    if (daysLeft < 0) {
      if (!notifyWhenExpiredDaily && !force) return null;
      return { bucket: `expired:${dayjs().format('YYYY-MM-DD')}`, level: 'expired' };
    }
    if (thresholds.includes(daysLeft)) {
      return { bucket: String(daysLeft), level: 'warning' };
    }
    // โหมดทดสอบ: ยิงทุกรายการปัจจุบัน โดย bucket ผูกกับเวลา (นาที) เพื่อไม่ติด dedup ตอนทดสอบซ้ำ
    if (force) {
      return {
        bucket: `test:${dayjs().format('YYYY-MM-DDTHH:mm')}`,
        level: 'warning',
      };
    }
    return null;
  }

  /** ข้อความสถานะกำหนด สำหรับ title/อีเมล */
  private dueLabel(daysLeft: number): string {
    return daysLeft < 0
      ? `เลยกำหนดมาแล้ว ${Math.abs(daysLeft)} วัน`
      : `ใกล้ถึงกำหนดในอีก ${daysLeft} วัน`;
  }

  private buildMessage(item: FiringItem): string {
    return `${item.categoryLabel} • ${item.carName} • ${item.detail}`;
  }

  private toMailItem(item: FiringItem): NotificationMailItem {
    return {
      categoryLabel: item.categoryLabel,
      carName: item.carName,
      detail: item.detail,
      dueLabel: this.dueLabel(item.daysLeft),
      isExpired: item.level === 'expired',
    };
  }
}
