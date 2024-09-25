import { Controller, Get, Query } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Controller('email-test')
export class EmailController {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true สำหรับการใช้ port 465
      auth: {
        user: 'taksapongk70@gmail.com',
        pass: 'mnot wowm sooe hmnh',
      },
    });
  }

  @Get('send')
  async sendEmail(
    @Query('subject') subject: string,
    @Query('text') text: string,
  ) {
    const mailOptions = {
      from: 'me',
      to:'aekkung500@gmail.com',
      subject,
      text,
    };
    console.log(mailOptions);

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return { message: 'Email sent successfully', info };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Error sending email', error };
    }
  }
}
