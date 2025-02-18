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
import { CustomerProductService } from './customer-product.service';
import { Prisma } from '@prisma/client';

@Controller('customer-product')
export class CustomerProductController {
  constructor(
    private readonly customerProductService: CustomerProductService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerProductCreateInput) {
    return this.customerProductService.create(data);
  }

  @Get()
  findAll() {
    return this.customerProductService.findAll();
  }
  @Get('many')
  findMany() {
    return this.customerProductService.findMany({});
  }
  @Get('active')
  findActive() {
    return this.customerProductService.findActive();
  }
  @Get('data-table')
  findDatatable(
    @Query('search') search: any,
    @Query('take') take?: string,
    @Query('skip') skip?: any,
  ) {
    return this.customerProductService.findDatatable(search, +take, +skip);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerProductService.findDetailById(+id);
  }
  @Get('/find-by-customer-group/:customerGroupId')
  findByCustmerGroup(
    @Param('customerGroupId') customerGroupId: string,
    @Query('search') search: any,
  ) {
    return this.customerProductService.findByCustomerGroup(
      +customerGroupId,
      search,
    );
  }
  @Get('/find-by-customer/:customerId')
  findByCustmer(
    @Param('customerId') customerId: string,
    @Query('search') search: any,
  ) {
    return this.customerProductService.findByCustomer(+customerId, search);
  }
  @Get('/find-by-customer-sub/:id')
  findByCustomerDetailSub(
    @Param('customerDetailSubId') customerDetailSubId: string,
    @Query('search') search: any,
  ) {
    return this.customerProductService.findByCustomerDetailSub(
      +customerDetailSubId,
      search,
    );
  }
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerProductService.findOneById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerProductDto: Prisma.customerProductUpdateInput,
  ) {
    return this.customerProductService.update(+id, updateCustomerProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProductService.remove(+id);
  }
}
