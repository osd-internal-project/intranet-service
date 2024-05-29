import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { MasterPositionService } from './master-position.service';
import { Prisma } from '@prisma/client';
@Controller('master-position')
export class MasterPositionController {
  constructor(private readonly masterPositionService: MasterPositionService) {}

  @Post()
  create(@Body('data') data: Prisma.masterPositionCreateInput) {
    return this.masterPositionService.create(data);
  }

  @Get()
  findAll() {
    return this.masterPositionService.findAll();
  }

  @Post('condition')
  findByCondition(
    @Body('condition') condition: Prisma.masterPositionFindManyArgs,
  ) {
    return this.masterPositionService.findByCondition(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterPositionUpdateInput,
  ) {
    return this.masterPositionService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.masterPositionService.remove(id);
  }
}
