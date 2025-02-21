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
import { CashflowActivityTypeService } from './cashflow-activity-type.service';
import { Prisma } from '@prisma/client';
@Controller('cashflow-activity-type')
export class CashflowActivityTypeController {
  constructor(
    private readonly cashflowActivityTypeService: CashflowActivityTypeService,
  ) {}

  @Post()
  create(@Body('data') data: Prisma.cashflowActivityTypeCreateInput) {
    return this.cashflowActivityTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.cashflowActivityTypeService.findAll();
  }

  @Get('many')
  findMany(
    @Query('condition') condition: Prisma.cashflowActivityTypeFindManyArgs,
  ) {
    return this.cashflowActivityTypeService.findMany(condition);
  }
  @Get(':id')
  findFirst(
    @Param('id') id: string,
    @Query('condition') condition: Prisma.cashflowActivityTypeFindManyArgs,
  ) {
    return this.cashflowActivityTypeService.findFirst(+id, condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.cashflowActivityTypeUpdateInput,
  ) {
    return this.cashflowActivityTypeService.update(+id, data);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.cashflowActivityTypeService.remove(+id);
  }
}
