import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Logger,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';
import { ITypeCreateOrderLots } from './common';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body('data') data: Prisma.orderCreateInput,
    @Body('orderLots') orderLots: ITypeCreateOrderLots[],
  ) {
    return this.orderService.create(data, orderLots);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.orderFindManyArgs) {
    return this.orderService.findByCondition(condition);
  }

  @Post('condition-first')
  findOneByCondition(@Body('condition') condition: Prisma.orderFindFirstArgs) {
    return this.orderService.findOneByCondition(condition);
  }

  @Patch()
  update(@Body('id') id: number, @Body('data') data: Prisma.orderUpdateInput) {
    return this.orderService.update(id, data);
  }
  @Patch('update-status')
  updateStatus(@Body('id') id: number, @Body('status') status: string) {
    console.log(id, status);
    return this.orderService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(Number(id));
  }
}
