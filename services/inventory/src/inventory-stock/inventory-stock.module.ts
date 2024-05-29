import { Module } from '@nestjs/common';
import { InventoryStockService } from './inventory-stock.service';
import { InventoryStockController } from './inventory-stock.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryStockController],
  providers: [InventoryStockService],
})
export class InventoryStockModule {}
