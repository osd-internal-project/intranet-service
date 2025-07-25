import configs from './configs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportController } from './app.controller';
import { ReportService } from './app.service';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { ReportMaModule } from './report-ma/report-ma.module';
import { PublicController } from './public/public.controller';
import { ReportOtModule } from './report-ot/report-ot.module';
import { ReportDataLeaveModule } from './report-data-leave/report-data-leave.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    ReportMaModule,
    ReportOtModule,
    ReportDataLeaveModule,
  ],
  controllers: [ReportController, PublicController],
  providers: [ReportService],
})
export class ReportMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
