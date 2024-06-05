import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvoteController } from './app.controller';
import { EvoteService } from './app.service';
import configs from './configs';
import { BrandModule } from './brand/brand.module';
import { ContactModule } from './contact/contact.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryLotModule } from './inventory-lot/inventory-lot.module';
import { InventoryStockModule } from './inventory-stock/inventory-stock.module';
import { MasterActionStatusModule } from './master-action-status/master-action-status.module';
import { MasterProductModule } from './master-product/master-product.module';
import { MasterProductCategoriesModule } from './master-product-categories/master-product-categories.module';
import { MasterProductGroupModule } from './master-product-group/master-product-group.module';
import { MasterProductFilesModule } from './master-product-files/master-product-files.module';
import { MasterProductImageModule } from './master-product-image/master-product-image.module';
import { MasterProductTypeModule } from './master-product-type/master-product-type.module';
import { MasterHazardtypeModule } from './master-hazard-type/master-hazard-type.module';
import { MasterUnitModule } from './master-unit/master-unit.module';
import { OrderModule } from './order/order.module';
import { OrderLotModule } from './order-lot/order-lot.module';
import { TransactionModule } from './transaction/transaction.module';
import { VenderModule } from './vender/vender.module';
import { LocationModule } from './location/location.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { UnitModule } from './unit/unit.module';
import { MasterGhsTypeModule } from './master-ghs-type/master-ghs-type.module';
import { ImageLocationModule } from './image-location/image-location.module';
import { MasterObjectiveModule } from './master-objective/master-objective.module';
import { FloorModule } from './floor/floor.module';
import { HousekeeperModule } from './housekeeper/housekeeper.module';
import { ResultCleanlinesModule } from './result-cleanlines/result-cleanlines.module';
import { MaTaskModule } from './ma-task/ma-task.module';
import { MaTypeModule } from './ma-type/ma-type.module';
import { MasterRoomModule } from './master-room/master-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    MasterActionStatusModule,
    BrandModule,
    ContactModule,
    InventoryModule,
    InventoryLotModule,
    InventoryStockModule,
    ImageLocationModule,
    MasterProductModule,
    MasterHazardtypeModule,
    MasterProductCategoriesModule,
    MasterProductGroupModule,
    MasterProductFilesModule,
    MasterProductImageModule,
    MasterProductTypeModule,
    MasterUnitModule,
    OrderModule,
    OrderLotModule,
    TransactionModule,
    VenderModule,
    LocationModule,
    UnitModule,
    MasterGhsTypeModule,
    MasterObjectiveModule,
    FloorModule,
    HousekeeperModule,
    ResultCleanlinesModule,
    MaTaskModule,
    MaTypeModule,
    MasterRoomModule,
  ],
  controllers: [EvoteController],
  providers: [EvoteService],
})
export class EvoteMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
