import { Module } from '@nestjs/common';
import { ReportOtService } from './report-ot.service';
import { ReportOtController } from './report-ot.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportOtController],
  providers: [ReportOtService],
})
export class ReportOtModule {}
