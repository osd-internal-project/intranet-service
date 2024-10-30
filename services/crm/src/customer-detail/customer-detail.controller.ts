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
import { sentMail } from '../utils/sent-mail';
@Controller('customer-detail')
export class CustomerDetailController {
  constructor(private readonly customerDetailService: CustomerDetailService) {}
  @Get('test-send-mail')
  async sendMail() {
    return await sentMail();
    // return [];
  }
  @Post()
  create(@Body() createCustomerDetailDto: Prisma.customerDetailCreateInput) {
    return this.customerDetailService.create(createCustomerDetailDto);
  }
  @Get('many')
  findMany(@Query() query: any) {
    return this.customerDetailService.findMany(query);
  }
  @Get('data-table')
  findDatatable(@Query() query: any) {
    return this.customerDetailService.findDatatable(query);
  }

  // @Get('range-event')
  // findRangeEvent(@Query() query) {
  //   return this.customerDetailService.findRangeEvent(query);
  // }
  @Get('active-for-project')
  findActiveForProject() {
    return this.customerDetailService.findActiveForProject();
  }
  @Get('config/customer-type-group')
  findConfigCustomerTypeGroup() {
    return this.customerDetailService.findConfigCustomerTypeGroup();
  }
  @Get('config/customer-responsible')
  findConfigCustomerResponsible() {
    return this.customerDetailService.findConfigCustomerResponsible();
  }
  @Get('config/customer-type')
  findConfigCustomerType() {
    return this.customerDetailService.findConfigCustomerType();
  }
  @Get('config/expense-type')
  findConfigExpenseType() {
    return this.customerDetailService.findConfigExpenseType();
  }
  @Get('config/ticket-configs')
  findConfigForTicket() {
    return this.customerDetailService.findConfigForTicket();
  }
  @Get('contract-company')
  findContractCompany() {
    return this.customerDetailService.findContractCompany();
  }

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
