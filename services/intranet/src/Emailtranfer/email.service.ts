import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path'; // นำเข้า path

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, html: any) {
    // ใช้ path.join() ในการสร้างเส้นทางไฟล์
    const attachmentPath = path.join(__dirname, '..', 'Emailtranfer', 'imagetemplate', 'j139049.png');

    const mailOptions = {
      from: 'aekkung500@gmail.com',
      to,
      subject,
      html,
      attachments: [
        {
          filename: 'j139049.png',
          path: attachmentPath, // ใช้เส้นทางที่สร้างด้วย path.join()
          cid: 'unique@j139049.png'
        }
      ]
    };
    console.log(mailOptions);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'aekkung500@gmail.com',
        pass: 'iwmh wbqa ajby eqpf', // ใช้ App Password แทนรหัสผ่านปกติ
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
