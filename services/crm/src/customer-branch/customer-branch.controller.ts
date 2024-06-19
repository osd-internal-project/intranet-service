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
import { CustomerBranchService } from './customer-branch.service';
import { Prisma } from '@prisma/client';
import { query } from 'express';

@Controller('customer-branch')
export class CustomerBranchController {
  constructor(private readonly customerBranchService: CustomerBranchService) {}

  @Post()
  create(@Body() data: Prisma.customerBranchCreateInput) {
    return this.customerBranchService.create(data);
  }

  @Get()
  findAll() {
    return this.customerBranchService.findAll();
  }
  @Get('many')
  findMany(@Query() query: object) {
    console.log(query);
    return this.customerBranchService.findMany({});
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerBranchService.findOneById(+id);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerBranchService.findDetailById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerBranchDto: Prisma.customerBranchUpdateInput,
  ) {
    return this.customerBranchService.update(+id, updateCustomerBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerBranchService.remove(+id);
  }
}
