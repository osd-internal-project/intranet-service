import { Module } from '@nestjs/common';
import { InventoryLotService } from './inventory-lot.service';
import { InventoryLotController } from './inventory-lot.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryLotController],
  providers: [InventoryLotService],
})
export class InventoryLotModule {}
