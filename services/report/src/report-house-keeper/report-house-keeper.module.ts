import { Module } from '@nestjs/common';
import { ReportHouseKeeperService } from './report-house-keeper.service';
import { ReportHouseKeeperController } from './report-house-keeper.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportHouseKeeperController],
  providers: [ReportHouseKeeperService],
})
export class ReportHouseKeeperModule {}
