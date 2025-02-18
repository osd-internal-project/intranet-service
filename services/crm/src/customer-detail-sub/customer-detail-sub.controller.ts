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
import { CustomerDetailSubService } from './customer-detail-sub.service';
import { Prisma } from '@prisma/client';
import { query } from 'express';

@Controller('customer-detail-sub')
export class CustomerDetailSubController {
  constructor(
    private readonly customerDetailSubService: CustomerDetailSubService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerDetailSubCreateInput) {
    return this.customerDetailSubService.create(data);
  }

  @Get()
  findAll() {
    return this.customerDetailSubService.findAll();
  }
  @Get('many')
  findMany(@Query() query: object) {
    return this.customerDetailSubService.findMany({});
  }

  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerDetailSubService.findDetailById(+id);
  }
  @Get('/detail-list-by-customer/:customerId')
  findDetailListByCustomerId(
    @Param('customerId') customerId: string,
    @Query('search') search: Prisma.customerDetailSubWhereInput,
  ) {
    return this.customerDetailSubService.findDetailListByCustomerId(
      +customerId,
      search,
    );
  }
  @Get('/detail-list-by-customer-sub/:customerSubId')
  findDetailListByCustomerSubId(
    @Param('customerSubId') customerSubId: string,
    @Query() query: Prisma.customerDetailSubWhereInput,
  ) {
    return this.customerDetailSubService.findDetailListByCustomerSubId(
      +customerSubId,
      query,
    );
  }
  @Get('customer-project/:id')
  findCustomerProjectBycustomerDetailSubId(@Param('id') id: string) {
    return this.customerDetailSubService.findCustomerProjectBycustomerId(+id);
  }
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerDetailSubService.findOneById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDetailSubDto: Prisma.customerDetailSubUpdateInput,
  ) {
    return this.customerDetailSubService.update(
      +id,
      updateCustomerDetailSubDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerDetailSubService.remove(+id);
  }
}
