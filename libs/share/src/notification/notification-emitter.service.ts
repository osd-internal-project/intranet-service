import { Injectable, Logger } from '@nestjs/common';
import { AccessService } from '../access/access.service';
import { NotificationRepository } from '../repositories/notification.repository';
import { NotificationSettingRepository } from '../repositories/notificationSetting.repository';
import { NotificationRecipientRepository } from '../repositories/notificationRecipient.repository';
import { UsersRepository } from '../repositories/user.repository';
import { SharedMailerService } from './shared-mailer';
import { catalogByKey, NotiTarget } from './notification-catalog';

/** บริบทของ 1 เหตุการณ์ที่ส่งเข้ามาให้ dispatcher */
export interface DispatchContext {
  requesterUserId?: string; //เจ้าของงาน — ใช้ resolve REQUESTER/APPROVER
  refId: string | number; //id ของ record ต้นเรื่อง (กันซ้ำ)
  event: string; //created | approved | reject ... (ส่วนหนึ่งของ dedupKey)
  title: string;
  message: string;
  path: string; //ลิงก์ปลายทางเมื่อคลิก
  level?: string; //info (ค่าเริ่มต้น) | warning | expired
  carId?: string;
  mail?: { subject: string; html: string }; //ถ้าไม่ระบุ = ไม่ส่งอีเมล
}

/** ผู้รับขั้นต่ำที่ deliver() ต้องการ */
interface DeliverUser {
  userId?: string | null;
  email?: string | null;
}

/**
 * Dispatcher กลางของระบบแจ้งเตือน — จุดเดียวที่ตัดสินใจว่า "ใครได้รับ" และ "ส่งช่องทางไหน"
 * โดยอิงจาก catalog (ค่า default ต่อประเภท) + notificationSetting (override โดยแอดมิน)
 * ทุก service เรียก dispatch(typeKey, ctx) — ไม่ต้องรู้ว่าใครคือผู้รับ
 */
@Injectable()
export class NotificationEmitterService {
  private readonly logger = new Logger(NotificationEmitterService.name);

  constructor(
    private readonly accessService: AccessService,
    private readonly notificationRepo: NotificationRepository,
    private readonly usersRepo: UsersRepository,
    private readonly mailer: SharedMailerService,
    private readonly settingRepo: NotificationSettingRepository,
    private readonly recipientRepo: NotificationRecipientRepository,
  ) {}

  /**
   * ยิงการแจ้งเตือน 1 เหตุการณ์
   * @param typeKey key ใน catalog เช่น 'leave-request'
   * @param ctx บริบทเหตุการณ์ (ผู้ขอ, ref, ข้อความ, อีเมล)
   */
  async dispatch(typeKey: string, ctx: DispatchContext) {
    const def = catalogByKey.get(typeKey);
    const setting = await this.settingRepo.findOne({
      where: { alertType: typeKey },
    });

    // ปิดใช้งาน → ไม่ทำอะไร (ถ้าไม่มีทั้ง setting และ def ก็ถือว่าไม่รู้จัก → ข้าม)
    if (setting && !setting.enabled) return;
    if (!def && !setting) {
      this.logger.warn(`dispatch: unknown notification type '${typeKey}'`);
      return;
    }

    const target = (setting?.targetStrategy ??
      def?.defaultTarget ??
      NotiTarget.REQUESTER) as NotiTarget;
    const moduleCode = setting?.moduleCode ?? def?.moduleCode;

    const users = await this.resolveRecipients(
      target,
      typeKey,
      ctx.requesterUserId,
      moduleCode,
    );
    if (!users.length) return;

    const sendWeb = setting ? setting.enabled && setting.webEnabled : true;
    const sendEmail = setting ? setting.enabled && setting.emailEnabled : true;
    await this.deliver(users, typeKey, ctx, sendWeb, sendEmail);
  }

  /** หาผู้รับตามกลยุทธ์ */
  private async resolveRecipients(
    target: NotiTarget,
    typeKey: string,
    requesterUserId?: string,
    moduleCode?: string,
  ): Promise<DeliverUser[]> {
    if (target === NotiTarget.APPROVER) {
      if (!moduleCode || !requesterUserId) return [];
      return (await this.accessService.getLeadUsersByUserId(
        moduleCode,
        requesterUserId,
      )) as DeliverUser[];
    }
    if (target === NotiTarget.FIXED_LIST) {
      // ผูกกับประเภทนี้ หรือรายชื่อ global (alertType = null ของเดิม)
      return (await this.recipientRepo.findMany({
        where: { OR: [{ alertType: typeKey }, { alertType: null }] },
      })) as DeliverUser[];
    }
    // REQUESTER
    if (!requesterUserId) return [];
    const user = (await this.usersRepo.findOne({
      where: { userId: requesterUserId },
    })) as DeliverUser | null;
    return user ? [user] : [];
  }

  /** สร้างแถวแจ้งเตือนบนเว็บ + ส่งอีเมลให้ผู้รับแต่ละคน (กันล้มทีละคน) */
  private async deliver(
    users: DeliverUser[],
    typeKey: string,
    ctx: DispatchContext,
    sendWeb: boolean,
    sendEmail: boolean,
  ) {
    if (!sendWeb && !sendEmail) return;
    for (const u of users) {
      if (sendWeb && u.userId) {
        const dedupKey = `${typeKey}:${ctx.refId}:${u.userId}:${ctx.event}`;
        try {
          await this.notificationRepo.create({
            data: {
              userId: u.userId,
              title: ctx.title,
              message: ctx.message,
              type: typeKey,
              refId: String(ctx.refId),
              carId: ctx.carId,
              path: ctx.path,
              level: ctx.level ?? 'info',
              isRead: false,
              dedupKey,
            },
          });
        } catch (err: any) {
          // P2002 = ยิงเหตุการณ์เดิมซ้ำ (เช่น resubmit) — ข้ามเงียบ ๆ
          if (err?.code !== 'P2002') {
            this.logger.error(`create notification failed (${dedupKey})`, err);
          }
        }
      }
      if (sendEmail && ctx.mail && u.email) {
        await this.mailer.send(u.email, ctx.mail.subject, ctx.mail.html);
      }
    }
  }
}
