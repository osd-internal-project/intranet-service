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
import { CashflowExpenseService } from './cashflow-expense.service';
import { Prisma } from '@prisma/client';
@Controller('cashflow-expense')
export class CashflowExpenseController {
  constructor(
    private readonly cashflowExpenseService: CashflowExpenseService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.cashflowExpenseCreateInput) {
    return this.cashflowExpenseService.create(data);
  }

  @Get()
  findAll() {
    return this.cashflowExpenseService.findAll();
  }

  @Get('many')
  findMany(@Query('condition') condition: Prisma.cashflowExpenseFindManyArgs) {
    return this.cashflowExpenseService.findMany(condition);
  }
  @Get(':id')
  findFirst(
    @Param('id') id: string,
    @Query('condition') condition: Prisma.cashflowExpenseFindManyArgs,
  ) {
    return this.cashflowExpenseService.findFirst(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.cashflowExpenseUpdateInput,
  ) {
    return this.cashflowExpenseService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.cashflowExpenseService.remove(+id);
  }
}
