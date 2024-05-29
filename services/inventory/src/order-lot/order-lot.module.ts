import { Module } from '@nestjs/common';
import { OrderLotService } from './order-lot.service';
import { OrderLotController } from './order-lot.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [OrderLotController],
  providers: [OrderLotService],
})
export class OrderLotModule {}
