import { Module } from '@nestjs/common';
import { RequestOrderService } from './request-order.service';
import { RequestOrderController } from './request-order.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [RequestOrderController],
  providers: [RequestOrderService],
})
export class RequestOrderModule {}
