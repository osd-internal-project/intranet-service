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
import { CashflowTypeService } from './cashflow-type.service';
import { Prisma } from '@prisma/client';
@Controller('cashflow-type')
export class CashflowTypeController {
  constructor(private readonly cashflowTypeService: CashflowTypeService) {}

  @Post()
  create(@Body('data') data: Prisma.cashflowTypeCreateInput) {
    return this.cashflowTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.cashflowTypeService.findAll();
  }

  @Get('many')
  findMany(@Query('condition') condition: Prisma.cashflowTypeFindManyArgs) {
    return this.cashflowTypeService.findMany(condition);
  }
  @Get(':id')
  findFirst(
    @Param('id') id: string,
    @Query('condition') condition: Prisma.cashflowTypeFindManyArgs,
  ) {
    return this.cashflowTypeService.findFirst(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.cashflowTypeUpdateInput,
  ) {
    return this.cashflowTypeService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.cashflowTypeService.remove(+id);
  }
}
