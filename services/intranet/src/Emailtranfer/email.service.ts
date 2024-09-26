import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo, Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, html: any) {
    const mailOptions = {
      from: 'aekkung500@gmail.com',
      to,
      subject,
      html,
      attachments: [
        {
          filename: 'j139049.png',
          path: '../imagetemplate/j139049.png',
          cid: 'unique@j139049.png'
        }
      ]
    };
    console.log(mailOptions);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'aekkung500@gmail.com',
        pass: 'khti vgpz pznj mhdh', // ใช้ App Password แทนรหัสผ่านปกติ
      },
      tls: {
        rejectUnauthorized: true,
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
