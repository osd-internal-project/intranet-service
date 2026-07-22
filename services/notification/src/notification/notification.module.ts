import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationCronService } from './notification.cron';
import { NotificationMailer } from './notification.mailer';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationCronService, NotificationMailer],
})
export class NotificationModule {}
