import { Module } from '@nestjs/common';
import { ReportMaService } from './report-ma.service';
import { ReportMaController } from './report-ma.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportMaController],
  providers: [ReportMaService],
})
export class ReportMaModule {}
