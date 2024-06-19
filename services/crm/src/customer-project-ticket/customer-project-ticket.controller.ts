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
import { CustomerProjectTicketService } from './customer-project-ticket.service';
import { Prisma } from '@prisma/client';
import { query } from 'express';

@Controller('customer-project-ticket')
export class CustomerProjectTicketController {
  constructor(
    private readonly customerProjectTicketService: CustomerProjectTicketService,
  ) {}

  @Post()
  create(@Body() data: Prisma.customerProjectTicketCreateInput) {
    return this.customerProjectTicketService.create(data);
  }

  @Get()
  findAll() {
    return this.customerProjectTicketService.findAll();
  }
  @Get('many')
  findMany(@Query() query: object) {
    console.log(query);
    return this.customerProjectTicketService.findMany({});
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerProjectTicketService.findOneById(+id);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerProjectTicketService.findDetailById(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateCustomerProjectTicketDto: Prisma.customerProjectTicketUpdateInput,
  ) {
    return this.customerProjectTicketService.update(
      +id,
      updateCustomerProjectTicketDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProjectTicketService.remove(+id);
  }
}
