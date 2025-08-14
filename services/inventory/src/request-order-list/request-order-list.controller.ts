import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestOrderListService } from './request-order-list.service';
import { CreateRequestOrderListDto } from './dto/create-request-order-list.dto';
import { UpdateRequestOrderListDto } from './dto/update-request-order-list.dto';

@Controller('request-order-list')
export class RequestOrderListController {
  constructor(
    private readonly requestOrderListService: RequestOrderListService,
  ) {}

  @Post()
  create(@Body() createRequestOrderListDto: CreateRequestOrderListDto) {
    return this.requestOrderListService.create(createRequestOrderListDto);
  }

  @Get()
  findAll() {
    return this.requestOrderListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestOrderListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestOrderListDto: UpdateRequestOrderListDto,
  ) {
    return this.requestOrderListService.update(+id, updateRequestOrderListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestOrderListService.remove(+id);
  }
}
