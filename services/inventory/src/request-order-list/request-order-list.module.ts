import { Module } from '@nestjs/common';
import { RequestOrderListService } from './request-order-list.service';
import { RequestOrderListController } from './request-order-list.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [RequestOrderListController],
  providers: [RequestOrderListService],
})
export class RequestOrderListModule {}
