import { Module } from '@nestjs/common';
import { ReportMaTaskService } from './report-ma-task.service';
import { ReportMaTaskController } from './report-ma-task.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportMaTaskController],
  providers: [ReportMaTaskService],
})
export class ReportMaTaskModule {}
