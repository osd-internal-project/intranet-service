import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotificationService } from './notification.service';
import { NotificationCronService } from './notification.cron';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationCron: NotificationCronService,
  ) {}

  /**
   * รันการสแกน+แจ้งเตือนทันที (ทดสอบ) — ?force=true บังคับยิงทุกรายการปัจจุบัน
   * ต้องมีผู้รับอย่างน้อย 1 คน ไม่งั้นจะไม่ส่งอะไร
   */
  @Post('run-now')
  runNow(@Query('force') force?: string) {
    return this.notificationCron.runNow(force === 'true');
  }

  // ----- ฟีดรายผู้ใช้ -----

  /** รายการแจ้งเตือนของผู้ใช้ — ?unread=true เพื่อเอาเฉพาะที่ยังไม่อ่าน */
  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
    @Query('unread') unread?: string,
  ) {
    return this.notificationService.findByUser(userId, unread === 'true');
  }

  /** จำนวนที่ยังไม่อ่าน (สำหรับ badge) */
  @Get('user/:userId/unread-count')
  unreadCount(@Param('userId') userId: string) {
    return this.notificationService.unreadCount(userId);
  }

  @Patch('user/:userId/read-all')
  markAllRead(@Param('userId') userId: string) {
    return this.notificationService.markAllRead(userId);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.notificationService.markRead(+id);
  }

  // ----- ตั้งค่า (แอดมิน) -----

  /** catalog ประเภทการแจ้งเตือนทั้งหมด (label/category/target/threshold) */
  @Get('catalog')
  getCatalog() {
    return this.notificationService.getCatalog();
  }

  @Get('setting')
  getSettings() {
    return this.notificationService.getSettings();
  }

  @Put('setting/:alertType')
  updateSetting(
    @Param('alertType') alertType: string,
    @Body() data: Prisma.notificationSettingUpdateInput,
  ) {
    return this.notificationService.updateSetting(alertType, data);
  }

  // ----- รายชื่อผู้รับ (แอดมิน) -----

  @Get('recipient')
  getRecipients(@Query('alertType') alertType?: string) {
    return this.notificationService.getRecipients(alertType);
  }

  @Post('recipient')
  addRecipient(
    @Body()
    body: { userId: string; email: string; name?: string; alertType?: string },
  ) {
    return this.notificationService.addRecipient(body);
  }

  @Delete('recipient/:id')
  removeRecipient(@Param('id') id: string) {
    return this.notificationService.removeRecipient(+id);
  }
}
