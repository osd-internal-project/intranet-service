import * as nodemailer from 'nodemailer';

export class EmailService {
  private transporter: { sendMail: (arg0: { from: string; to: string; subject: string;html: string; }) => any; };

  constructor() {
    // ตั้งค่า OAuth2
    this.transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        type: 'OAuth2',
        user: 'aekittipon_500@hotmail.com',
        clientId: '880223d7-b8d4-4c4c-b718-b61e1aa4ce32',  // Client ID จาก Azure AD
        clientSecret: '2231f5a9-0762-4cb8-916b-679b819aaeee',  // Client Secret จาก Azure AD
        refreshToken: 'YOUR_REFRESH_TOKEN',  // Refresh Token จากการยืนยันตัวตน
        accessToken: 'YOUR_ACCESS_TOKEN',    // Access Token (ถ้าได้แล้ว)
      },
    });
  }

  async sendMail(to: string, subject: string, html?: string) {
    const mailOptions = {
      from: 'aekittipon_500@hotmail.com',
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}
