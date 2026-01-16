import { Module } from '@nestjs/common';
import { ReportEmpAssetService } from './report-emp-asset.service';
import { ReportEmpAssetController } from './report-emp-asset.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportEmpAssetController],
  providers: [ReportEmpAssetService],
})
export class ReportEmpAssetModule {}
