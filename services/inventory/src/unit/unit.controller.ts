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
import { UnitService } from './unit.service';
import { Prisma } from '@prisma/client';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() createUnitDto: Prisma.unitCreateInput) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  findAll(
    @Query() query: Prisma.unitWhereInput,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.unitService.findAll(query, +skip, +take);
  }

  @Get('options')
  findOptions() {
    return this.unitService.findOptions();
  }

  @Get(':id')
  findOne(
    @Query() query: Prisma.unitWhereInput,
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('id') id: string,
  ) {
    return this.unitService.findOne(+id, query, +skip, +take);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: Prisma.unitUpdateInput,
  ) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}
