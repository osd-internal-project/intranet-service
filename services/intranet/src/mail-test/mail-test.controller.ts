import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { SharedMailerService } from '@inventory/share';
import { INTRANET_TEST_TEMPLATES, toTemplateMeta } from './mail-test.registry';

/**
 * ทดสอบส่งอีเมล template งานอนุมัติ (ลา/จองรถ/จองห้อง/OT) ของ service นี้
 * ให้แอดมินเลือก template + กรอกข้อมูล + ยิงอีเมลทดสอบไปยังอีเมลที่ระบุ
 */
@Controller('mail-test')
export class MailTestController {
  constructor(private readonly mailer: SharedMailerService) {}

  /** รายการ template ที่ทดสอบส่งได้ พร้อม field metadata สำหรับ render ฟอร์ม */
  @Get('templates')
  getTemplates() {
    return toTemplateMeta(INTRANET_TEST_TEMPLATES);
  }

  /** ทดสอบยิงอีเมล 1 ฉบับตาม template + ข้อมูลที่กรอก */
  @Post('send')
  async send(
    @Body() body: { key: string; to: string; data: Record<string, unknown> },
  ) {
    const { key, to, data } = body ?? ({} as typeof body);
    if (!to) throw new BadRequestException('กรุณาระบุอีเมลผู้รับ (to)');
    const entry = INTRANET_TEST_TEMPLATES.find((t) => t.key === key);
    if (!entry) throw new BadRequestException(`ไม่พบ template '${key}'`);
    const html = await entry.build(data ?? {});
    await this.mailer.send(to, entry.subject, html);
    return { success: true, to, key };
  }
}
