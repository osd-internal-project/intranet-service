import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderLotService } from './order-lot.service';
import { Prisma } from '@prisma/client';

@Controller('order-lot')
export class OrderLotController {
  constructor(private readonly orderLotService: OrderLotService) {}

  @Post()
  create(@Body() createOrderLotDto: Prisma.orderLotCreateInput) {
    return this.orderLotService.create(createOrderLotDto);
  }

  @Get()
  findAll(
    @Query() query: Prisma.orderLotWhereInput,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.orderLotService.findAll(query, +skip, +take);
  }

  @Get(':barcode')
  findOne(@Param('barcode') barcode: string) {
    return this.orderLotService.findOne(barcode);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderLotDto: Prisma.orderLotUpdateInput,
  ) {
    return this.orderLotService.update(+id, updateOrderLotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderLotService.remove(+id);
  }
}
