import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  async sendEmail(subject: string, text: string) {
    const mailOptions = {
      from: 'taksapongk70@gmail.com',
      to: 'aekkung500@gmail.com',
      subject,
      text,
    };
    console.log(mailOptions);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'taksapongk70@gmail.com',
        pass: 'mnot wowm sooe hmnh', // ใช้ App Password แทนรหัสผ่านปกติ
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    try {
      const info = await transporter.sendMail(mailOptions); // ใช้ transporter ที่สร้างในฟังก์ชัน
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
