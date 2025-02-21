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
import { CashflowSaleService } from './cashflow-sale.service';
import { Prisma } from '@prisma/client';
@Controller('cashflow-sale')
export class CashflowSaleController {
  constructor(private readonly cashflowSaleService: CashflowSaleService) {}

  @Post()
  create(@Body('data') data: Prisma.cashflowSaleCreateInput) {
    return this.cashflowSaleService.create(data);
  }

  @Get()
  findAll() {
    return this.cashflowSaleService.findAll();
  }

  @Get('many')
  findMany(@Query('condition') condition: Prisma.cashflowSaleFindManyArgs) {
    return this.cashflowSaleService.findMany(condition);
  }
  @Get(':id')
  findFirst(
    @Param('id') id: string,
    @Query('condition') condition: Prisma.cashflowSaleFindManyArgs,
  ) {
    return this.cashflowSaleService.findFirst(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.cashflowSaleUpdateInput,
  ) {
    return this.cashflowSaleService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.cashflowSaleService.remove(+id);
  }
}
