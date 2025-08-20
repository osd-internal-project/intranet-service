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
import { RequestOrderService } from './request-order.service';
import { RequestOrderType } from './dto/create-request-order.dto';
import { Prisma } from '@prisma/client';

@Controller('request-order')
export class RequestOrderController {
  constructor(private readonly requestOrderService: RequestOrderService) {}

  @Post()
  create(@Body() createRequestOrderDto: RequestOrderType) {
    return this.requestOrderService.create(createRequestOrderDto);
  }

  @Get()
  findAll(
    @Query() query: Prisma.requestOrderWhereInput,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.requestOrderService.findAll(query, +skip, +take);
  }

  @Get(':requestId')
  findOne(@Param('requestId') requestId: string) {
    return this.requestOrderService.findOne(requestId);
  }

  @Patch(':requestId')
  update(
    @Param('requestId') requestId: string,
    @Body() updateRequestOrderDto: Prisma.requestOrderUpdateInput,
  ) {
    return this.requestOrderService.update(requestId, updateRequestOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestOrderService.remove(+id);
  }
}
