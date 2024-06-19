import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { CustomerDetailService } from './customer-detail.service';
import { Prisma } from '@prisma/client';
@Controller('customer-detail')
export class CustomerDetailController {
  constructor(private readonly customerDetailService: CustomerDetailService) {}

  @Post()
  create(@Body() createCustomerDetailDto: Prisma.customerDetailCreateInput) {
    return this.customerDetailService.create(createCustomerDetailDto);
  }
  @Get('many')
  findDataTable(@Query() query: any) {
    return this.customerDetailService.findMany(query);
  }
  // @Get('range-event')
  // findRangeEvent(@Query() query) {
  //   return this.customerDetailService.findRangeEvent(query);
  // }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerDetailService.findOneById(+id);
  }
  @Get()
  findAll() {
    return this.customerDetailService.findAll();
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.customerDetailUpdateInput,
  ) {
    return this.customerDetailService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerDetailService.remove(+id);
  }
}
