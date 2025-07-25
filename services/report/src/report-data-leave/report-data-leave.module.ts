import { Module } from '@nestjs/common';
import { ReportDataLeaveService } from './report-data-leave.service';
import { ReportDataLeaveController } from './report-data-leave.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportDataLeaveController],
  providers: [ReportDataLeaveService],
})
export class ReportDataLeaveModule {}
