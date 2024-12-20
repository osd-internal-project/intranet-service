import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { Prisma } from '@prisma/client';
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body('data') data: Prisma.unitCreateArgs) {
    return this.unitService.create(data);
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.unitFindManyArgs) {
    return this.unitService.findMany(condition);
  }

  @Patch()
  update(@Body('id') id: number, @Body('data') data: Prisma.unitUpdateInput) {
    return this.unitService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.unitService.remove(id);
  }
}
