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
import { OrderLotService } from './order-lot.service';
import { Prisma } from '@prisma/client';
@Controller('order-lot')
export class OrderLotController {
  constructor(private readonly orderLotService: OrderLotService) {}

  @Post()
  create(@Body('data') data: Prisma.orderLotCreateInput) {
    return this.orderLotService.create(data);
  }

  @Get()
  findAll() {
    return this.orderLotService.findAll();
  }

  @Post('condition')
  findByCondition(@Body('condition') condition: Prisma.orderLotFindManyArgs) {
    return this.orderLotService.findByCondition(condition);
  }

  @Post('condition-first')
  findOneByCondition(
    @Body('condition') condition: Prisma.orderLotFindFirstArgs,
  ) {
    return this.orderLotService.findOneByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.orderLotUpdateInput,
  ) {
    return this.orderLotService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderLotService.remove(Number(id));
  }
}
