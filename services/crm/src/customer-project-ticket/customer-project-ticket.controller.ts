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
import { AccessService } from '@inventory/share';

@Controller('customer-project-ticket')
export class CustomerProjectTicketController {
  constructor(
    private readonly customerProjectTicketService: CustomerProjectTicketService,
    private readonly accessService: AccessService,
  ) {}

  @Post()
  async create(@Body() data: Prisma.customerProjectTicketCreateInput) {
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

  @Get('/find-by-task/:taskid')
  findByTaskId(@Param('taskid') id: string) {
    return this.customerProjectTicketService.findByTaskId(+id);
  }
  @Get('/find-by-project/:projectid')
  findByProjectId(@Param('projectid') id: string) {
    return this.customerProjectTicketService.findByProjectId(+id);
  }
  @Get('/detail/:id')
  findDetailById(@Param('id') id: string) {
    return this.customerProjectTicketService.findDetailById(+id);
  }
  @Get('/data-table/:userid')
  findListByUserId(
    @Param('userid') userid: string,
    @Query('query') query,
    @Query('skip') skip,
    @Query('take') take,
  ) {
    return this.customerProjectTicketService.findDatatableUserId(
      userid,
      query,
      +skip,
      +take,
    );
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.customerProjectTicketService.findOneById(+id);
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

  @Patch('expend/:expendid')
  updateExpend(
    @Param('expendid') expendId: string,
    @Body()
    data: Prisma.ticketExpendUpdateInput,
  ) {
    return this.customerProjectTicketService.updateExpend(+expendId, data);
  }
  @Delete('expend/:expendid')
  removeExpend(@Param('expendid') id: string) {
    return this.customerProjectTicketService.removeExpend(+id);
  }
}
