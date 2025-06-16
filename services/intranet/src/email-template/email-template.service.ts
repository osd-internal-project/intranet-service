import { Injectable } from '@nestjs/common';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { emailTemplateRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailTemplateService {
  constructor(private readonly emailtemplateRepo: emailTemplateRepository) {}
  create(createEmailTemplateDto: Prisma.emailTemplateCreateInput) {
    const base = {
      data: createEmailTemplateDto,
    };
    return this.emailtemplateRepo.create(base);
  }

  findAll() {
    return this.emailtemplateRepo.findAll();
  }
  optionsTemplate() {
    return this.emailtemplateRepo.findMany({
      where: {
        status: 'active',
      },
    });
  }

  findOne(id: number) {
    const base = {
      where: {
        id: id,
      },
    };
    return this.emailtemplateRepo.findOne(base);
  }

  findByType(typeId: number) {
    const base: Prisma.emailTemplateFindManyArgs = {
      where: {
        type: typeId,
      },
      include: {
        emailTemplateType: true,
      },
    };
    return this.emailtemplateRepo.findMany(
      typeId === 0
        ? {
            include: {
              emailTemplateType: true,
            },
          }
        : base,
    );
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    const base = {
      where: {
        id: id,
      },
      data: {
        ...updateEmailTemplateDto,
      },
    };
    return this.emailtemplateRepo.update(base);
  }

  async sendmailForCreateRolesInId24(user: Prisma.usersCreateInput) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // ใช้ SMTP ของ Outlook (Microsoft 365)
      port: 587, // พอร์ตสำหรับ TLS (STARTTLS)
      secure: false, // ใช้ STARTTLS (ไม่ใช่ SSL ทันที)
      auth: {
        user: 'internalsupport@osd.co.th', // อีเมลผู้ส่ง
        pass: 'Internal-support@osd1234.', // รหัสผ่าน (หรือ App Password ถ้าเปิด 2FA)
      },
    });
    return await transporter.sendMail({
      from: '"admin Intranet" <internalsupport@osd.co.th>',
      to: `wasmeej@osd.co.th`,
      subject: 'ใส่ Role ให้พนักงานในระบบ ID24',
      text: '',
      html: `<p>เรียน Wasmee</p>
            <p>กรุณาใส่ Role ให้พนักงานในระบบ ID24 ตามที่ได้แจ้งไว้ในระบบ Intranet</p>
            <p>รายละเอียด:</p>
            <p>ชื่อ: ${user.firstNameTh} ${user.lastNameTh}</p>
            <p>ขอบคุณครับ</p>
            <p>ทีมงาน Intranet</p>`,
    });
  }

  remove(id: number) {
    const base = {
      where: {
        id: id,
      },
    };
    return this.emailtemplateRepo.delete(base);
  }
}
