import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntranetController } from './app.controller';
import { IntranetService } from './app.service';
import configs from './configs';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { CustomerDetailModule } from './customer-detail/customer-detail.module';
import { CustomerTypeGroupModule } from './customer-type-group/customer-type-group.module';
import { CustomerFilesModule } from './customer-files/customer-files.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { CustomerContactModule } from './customer-contact/customer-contact.module';
import { CustomerProjectTaskModule } from './customer-project-task/customer-project-task.module';
import { CustomerProjectModule } from './customer-project/customer-project.module';
import { CustomerProjectTicketModule } from './customer-project-ticket/customer-project-ticket.module';
import { TicketHistoryLogsModule } from './ticket-history-logs/ticket-history-logs.module';
import { CustomerDetailSubModule } from './customer-detail-sub/customer-detail-sub.module';
import { CustomerProductModule } from './customer-product/customer-product.module';
import { CustomerGroupModule } from './customer-group/customer-group.module';
import { CustomerTypeModule } from './customer-type/customer-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    CustomerAddressModule,
    CustomerContactModule,
    CustomerGroupModule,
    CustomerDetailModule,
    CustomerDetailSubModule,
    CustomerTypeModule,
    CustomerTypeGroupModule,
    CustomerFilesModule,
    CustomerProductModule,
    CustomerProjectModule,
    CustomerProjectTaskModule,
    CustomerProjectTicketModule,
    TicketHistoryLogsModule,
  ],
  controllers: [IntranetController],
  providers: [IntranetService],
})
export class IntranetMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
