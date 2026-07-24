import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MailTestController } from './mail-test.controller';

/**
 * โมดูลทดสอบส่งอีเมล — ใช้ SharedMailerService (export จาก PrismaModule)
 * ไม่มี service/provider ของตัวเอง เพราะ registry เป็นข้อมูล static
 */
@Module({
  imports: [PrismaModule],
  controllers: [MailTestController],
})
export class MailTestModule {}
