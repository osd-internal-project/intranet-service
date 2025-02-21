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
import { CashflowExpenseCyclesService } from './cashflow-expense-cycles.service';
import { Prisma } from '@prisma/client';
@Controller('cashflow-expense-cycles')
export class CashflowExpenseCyclesController {
  constructor(
    private readonly cashflowExpenseCyclesService: CashflowExpenseCyclesService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.cashflowExpenseCyclesCreateInput) {
    return this.cashflowExpenseCyclesService.create(data);
  }

  @Get()
  findAll() {
    return this.cashflowExpenseCyclesService.findAll();
  }

  @Get('many')
  findMany(
    @Query('condition') condition: Prisma.cashflowExpenseCyclesFindManyArgs,
  ) {
    return this.cashflowExpenseCyclesService.findMany(condition);
  }
  @Get(':id')
  findFirst(
    @Param('id') id: string,
    @Query('condition') condition: Prisma.cashflowExpenseCyclesFindManyArgs,
  ) {
    return this.cashflowExpenseCyclesService.findFirst(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.cashflowExpenseCyclesUpdateInput,
  ) {
    return this.cashflowExpenseCyclesService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.cashflowExpenseCyclesService.remove(+id);
  }
}
