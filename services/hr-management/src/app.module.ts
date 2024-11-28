import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntranetController } from './app.controller';
import { IntranetService } from './app.service';
import configs from './configs';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { EmployeeRegisterModule } from './employee-register/employee-register.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    EmployeeProfileModule,
    EmployeeRegisterModule,
  ],
  controllers: [IntranetController],
  providers: [IntranetService],
})
export class IntranetMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
