import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
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
    @Param('id') id: number,
    @Body()
    updateCustomerProjectTicketDto: Prisma.customerProjectTicketUpdateInput,
  ) {
    Logger.debug(id, updateCustomerProjectTicketDto);
    return this.customerProjectTicketService.update(
      +id,
      updateCustomerProjectTicketDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerProjectTicketService.remove(+id);
  }
  @Get('expense/user/:userid')
  findExpenseByUserId(@Param('userid') userId: string, @Query() query: any) {
    return this.customerProjectTicketService.findExpenseByUserId(userId, query);
  }
  @Patch('expense/:expenseid')
  updateExpense(
    @Param('expenseid') expenseId: string,
    @Body()
    data: Prisma.ticketExpenseUpdateInput,
  ) {
    return this.customerProjectTicketService.updateExpense(+expenseId, data);
  }
  @Delete('expense/:expenseid')
  removeExpense(@Param('expenseid') id: string) {
    return this.customerProjectTicketService.removeExpense(+id);
  }
}
