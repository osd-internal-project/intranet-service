import { Module } from '@nestjs/common';
import { ReportWithdrawRankingService } from './report-withdraw-ranking.service';
import { ReportWithdrawRankingController } from './report-withdraw-ranking.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportWithdrawRankingController],
  providers: [ReportWithdrawRankingService],
})
export class ReportWithdrawRankingModule {}
