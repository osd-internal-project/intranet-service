import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from '../configs';
import {
  templateNotification,
  NotificationMailItem,
} from '../utils/template-notification';

/**
 * ตัวส่งอีเมลของโมดูลแจ้งเตือน — รวมการตั้งค่า transporter ไว้ที่เดียว
 * ค่า SMTP อ่านจาก configs (คงค่าเดิมของระบบไว้ ย้ายไป env ได้ที่ไฟล์ configs ไฟล์เดียว)
 */
@Injectable()
export class NotificationMailer {
  private readonly logger = new Logger(NotificationMailer.name);

  private buildTransporter() {
    const cfg = config();
    return nodemailer.createTransport({
      host: cfg.smtpHost,
      port: cfg.smtpPort,
      secure: false,
      auth: { user: cfg.smtpUser, pass: cfg.smtpPass },
    });
  }

  /**
   * ส่งอีเมล digest ให้ผู้รับ 1 คน
   * @param to อีเมลผู้รับ
   * @param recipientName ชื่อผู้รับ
   * @param items รายการที่ถึงเกณฑ์แจ้งเตือน
   */
  async sendDigest(
    to: string,
    recipientName: string,
    items: NotificationMailItem[],
  ) {
    if (!items.length) return;
    const cfg = config();
    const html = templateNotification(recipientName, items);
    try {
      await this.buildTransporter().sendMail({
        from: cfg.smtpFrom,
        to,
        subject: 'OSD Intranet แจ้งเตือนกำหนดเอกสาร/ตรวจสภาพรถ',
        html,
      });
      this.logger.log(`✅ Sent notification digest to ${to}`);
    } catch (err) {
      this.logger.error(`❌ Failed to send to ${to}`, err as Error);
    }
  }

  /**
   * ส่งอีเมล HTML แบบทั่วไป (ใช้กับการทดสอบส่ง template ต่าง ๆ)
   * @param to อีเมลผู้รับ
   * @param subject หัวข้ออีเมล
   * @param html เนื้อหา HTML ที่ render มาแล้ว
   */
  async sendHtml(to: string, subject: string, html: string) {
    const cfg = config();
    await this.buildTransporter().sendMail({
      from: cfg.smtpFrom,
      to,
      subject,
      html,
    });
    this.logger.log(`✅ Sent test email "${subject}" to ${to}`);
  }
}
