import { Module } from '@nestjs/common';
import { NotiLogsService } from './noti-logs.service';
import { NotiLogsController } from './noti-logs.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [NotiLogsController],
  providers: [NotiLogsService],
})
export class NotiLogsModule {}
