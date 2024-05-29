import { Module } from '@nestjs/common';
import { ReportTransactionExpiredService } from './report-transaction-expired.service';
import { ReportTransactionExpiredController } from './report-transaction-expired.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportTransactionExpiredController],
  providers: [ReportTransactionExpiredService],
})
export class ReportTransactionExpiredModule {}
