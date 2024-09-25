import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter<SentMessageInfo, Options>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      
      service:'gmail', // true สำหรับการใช้ port 465
      auth: {
        user: 'taksapongk70@gmail.com',
        pass: 'mnot wowm sooe hmnh', // ใช้ App Password แทนรหัสผ่านปกติ
      },
      tls: {
        rejectUnauthorized: false       // ใช้สำหรับ debug กรณีเซิร์ฟเวอร์มีใบรับรองที่ไม่เชื่อถือ
      }
    });
  }

  async sendEmail(subject: string, text: string) {
    const mailOptions = {
      from: 'taksapongk70@gmail.com',
      to: 'aekkung500@gmail.com',
      subject,
      text,
    };
    console.log(mailOptions);
    
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
