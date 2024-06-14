import { Module } from '@nestjs/common';
import { DataLeaveFileService } from './data-leave-file.service';
import { DataLeaveFileController } from './data-leave-file.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [DataLeaveFileController],
  providers: [DataLeaveFileService],
})
export class DataLeaveFileModule {}
