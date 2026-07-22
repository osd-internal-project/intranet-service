import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

/**
 * ตัวส่งอีเมลกลางของทั้งระบบ — รวม transporter ไว้ที่เดียว
 * อ่านค่า SMTP จาก env (SMTP_*) โดยมีค่าเดิมของระบบเป็น fallback
 * (เดิมแต่ละ service สร้าง transporter + hardcoded creds ของตัวเอง)
 */
@Injectable()
export class SharedMailerService {
  private readonly logger = new Logger(SharedMailerService.name);

  private transporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'internalsupport@osd.co.th',
        pass: process.env.SMTP_PASS || 'Internal-support@osd1234.',
      },
    });
  }

  private from() {
    return (
      process.env.SMTP_FROM || '"admin Intranet" <internalsupport@osd.co.th>'
    );
  }

  /**
   * ส่งอีเมล 1 ฉบับ — ไม่ throw (log แล้วปล่อยผ่าน) เพื่อไม่ให้ล้ม flow หลัก
   * @param to อีเมลผู้รับ
   * @param subject หัวข้อ
   * @param html เนื้อหา HTML
   */
  async send(to: string, subject: string, html: string) {
    if (!to) return;
    try {
      await this.transporter().sendMail({
        from: this.from(),
        to,
        subject,
        text: '',
        html,
      });
    } catch (err) {
      this.logger.error(`Failed to send mail to ${to}`, err as Error);
    }
  }
}
