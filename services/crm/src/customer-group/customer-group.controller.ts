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
import { CustomerGroupService } from './customer-group.service';
import { Prisma } from '@prisma/client';

@Controller('customer-group')
export class CustomerGroupController {
  constructor(private readonly customerGroupService: CustomerGroupService) {}

  @Post()
  create(@Body() data: Prisma.customerGroupCreateInput) {
    return this.customerGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.customerGroupService.findAll();
  }
  @Get('many')
  findMany() {
    return this.customerGroupService.findMany({});
  }
  @Get('data-table')
  findDatatable(
    @Query('search') search: any,
    @Query('take') take?: string,
    @Query('skip') skip?: any,
  ) {
    return this.customerGroupService.findDatatable(search, +take, +skip);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerGroupService.findDetailById(+id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerGroupService.findOneById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerGroupDto: Prisma.customerGroupUpdateInput,
  ) {
    return this.customerGroupService.update(+id, updateCustomerGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerGroupService.remove(+id);
  }
}
