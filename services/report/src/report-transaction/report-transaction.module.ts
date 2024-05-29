import { Module } from '@nestjs/common';
import { ReportTransactionService } from './report-transaction.service';
import { ReportTransactionController } from './report-transaction.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ReportTransactionController],
  providers: [ReportTransactionService],
})
export class ReportTransactionModule {}
