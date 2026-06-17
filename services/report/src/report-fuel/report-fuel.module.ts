import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { ReportFuelService } from './report-fuel.service';
import { ReportFuelController } from './report-fuel.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReportFuelController],
  providers: [ReportFuelService],
})
export class ReportFuelModule {}
