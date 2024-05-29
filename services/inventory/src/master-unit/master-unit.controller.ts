import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { MasterUnitService } from './master-unit.service';
import { Prisma } from '@prisma/client';
@Controller('master-unit')
export class MasterUnitController {
  constructor(private readonly masterUnitService: MasterUnitService) {}

  @Post()
  create(@Body('data') data: Prisma.masterUnitCreateInput) {
    return this.masterUnitService.create(data);
  }

  @Get()
  findAll() {
    return this.masterUnitService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.masterUnitFindManyArgs) {
    return this.masterUnitService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterUnitUpdateInput,
  ) {
    return this.masterUnitService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.masterUnitService.remove(id);
  }
}
