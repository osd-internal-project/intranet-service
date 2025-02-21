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
import { CashflowSaleCyclesService } from './cashflow-sale-cycles.service';
import { Prisma } from '@prisma/client';
@Controller('cashflow-sale-cycles')
export class CashflowSaleCyclesController {
  constructor(
    private readonly cashflowSaleCyclesService: CashflowSaleCyclesService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.cashflowSaleCyclesCreateInput) {
    return this.cashflowSaleCyclesService.create(data);
  }

  @Get()
  findAll() {
    return this.cashflowSaleCyclesService.findAll();
  }

  @Get('many')
  findMany(
    @Query('condition') condition: Prisma.cashflowSaleCyclesFindManyArgs,
  ) {
    return this.cashflowSaleCyclesService.findMany(condition);
  }
  @Get(':id')
  findFirst(
    @Param('id') id: string,
    @Query('condition') condition: Prisma.cashflowSaleCyclesFindManyArgs,
  ) {
    return this.cashflowSaleCyclesService.findFirst(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.cashflowSaleCyclesUpdateInput,
  ) {
    return this.cashflowSaleCyclesService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.cashflowSaleCyclesService.remove(+id);
  }
}
