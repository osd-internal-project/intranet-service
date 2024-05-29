import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvoteController } from './app.controller';
import { EvoteService } from './app.service';
import configs from './configs';

import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

import { ReportTransactionModule } from './report-transaction/report-transaction.module';
import { ReportWithdrawRankingModule } from './report-withdraw-ranking/report-withdraw-ranking.module';
import { ReportTransactionExpiredModule } from './report-transaction-expired/report-transaction-expired.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),

    //Report
    ReportTransactionModule,
    ReportTransactionExpiredModule,
    ReportWithdrawRankingModule,
    DashboardModule,
    //Auth
  ],
  controllers: [EvoteController],
  providers: [EvoteService],
})
export class EvoteMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
