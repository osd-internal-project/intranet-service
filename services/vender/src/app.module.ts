import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvoteController } from './app.controller';
import { EvoteService } from './app.service';
import configs from './configs';
import { BrandModule } from './brand/brand.module';
import { ContactModule } from './contact/contact.module';
import { MasterProductModule } from './master-product/master-product.module';
import { MasterProductCategoriesModule } from './master-product-categories/master-product-categories.module';
import { MasterProductGroupModule } from './master-product-group/master-product-group.module';
import { MasterProductImageModule } from './master-product-image/master-product-image.module';
import { MasterProductTypeModule } from './master-product-type/master-product-type.module';
import { MasterUnitModule } from './master-unit/master-unit.module';

import { VenderModule } from './vender/vender.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { UnitModule } from './unit/unit.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),

    BrandModule,
    ContactModule,
    MasterProductModule,
    MasterProductCategoriesModule,
    MasterProductGroupModule,
    MasterProductImageModule,
    MasterProductTypeModule,
    MasterUnitModule,
    VenderModule,
    UnitModule,
  ],
  controllers: [EvoteController],
  providers: [EvoteService],
})
export class EvoteMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
