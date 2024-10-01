import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { google } from 'googleapis';

// สร้าง OAuth2Client และตั้งค่า Credentials
const oAuth2Client = new google.auth.OAuth2(
  'c1834bd4-9599-4e43-8e71-2e564ba2e3f7',
  'your_client_secret',
  'https://developers.google.com/oauthplayground'
);
oAuth2Client.setCredentials({
  refresh_token: 'your_refresh_token',
});

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, html: any) {
    // ใช้ path.join() ในการสร้างเส้นทางไฟล์
    const attachmentPath = path.join(__dirname, '..', 'Emailtranfer', 'imagetemplate', 'j139049.png');

    const accessToken = await oAuth2Client.getAccessToken();
    const mailOptions = {
      from: 'aekittipon_500@hotmail.com',
      to,
      subject,
      html,
      attachments: [
        {
          filename: 'j139049.png',
          path: attachmentPath,
          cid: 'unique@j139049.png'
        }
      ]
    };
    console.log(mailOptions);

    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        type: 'OAuth2',
        user: 'aekittipon_500@hotmail.com',
        clientId: 'c1834bd4-9599-4e43-8e71-2e564ba2e3f7',
        clientSecret: '07ead950-e57a-42b5-87e2-5fac9cb753ef',
        refreshToken: '4eaa2ece-4216-4463-8a47-7f366ce5a58f',
        accessToken: accessToken.token,
      },
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
