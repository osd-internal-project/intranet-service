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
import { CustomerProjectTaskService } from './customer-project-task.service';
import { Prisma } from '@prisma/client';
import { query } from 'express';

@Controller('customer-project-task')
export class CustomerProjectTaskController {
  constructor(
    private readonly customerProjectTaskService: CustomerProjectTaskService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerProjectTaskCreateInput) {
    return this.customerProjectTaskService.create(data);
  }

  @Get()
  findAll() {
    return this.customerProjectTaskService.findAll();
  }
  @Get('many')
  findMany(@Query() query: object) {
    console.log(query);
    return this.customerProjectTaskService.findMany({});
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerProjectTaskService.findOneById(+id);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerProjectTaskService.findDetailById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerProjectTaskDto: Prisma.customerProjectTaskUpdateInput,
  ) {
    return this.customerProjectTaskService.update(
      +id,
      updateCustomerProjectTaskDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProjectTaskService.remove(+id);
  }
}
