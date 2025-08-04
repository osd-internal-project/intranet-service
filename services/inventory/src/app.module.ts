import configs from './configs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InventoryController } from './app.controller';
import { InventoryService } from './app.service';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { PublicController } from './public/public.controller';
import { MasterProductModule } from './master-product/master-product.module';
import { UnitModule } from './unit/unit.module';
import { MasterProductImageModule } from './master-product-image/master-product-image.module';
import { OrderModule } from './order/order.module';
import { OrderLotModule } from './order-lot/order-lot.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    MasterProductModule,
    UnitModule,
    MasterProductImageModule,
    OrderModule,
    OrderLotModule,
  ],
  controllers: [InventoryController, PublicController],
  providers: [InventoryService],
})
export class InventoryMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
