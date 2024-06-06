import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaTypeService } from './ma-type.service';
import { Prisma } from '@prisma/client';
@Controller('ma-type')
export class MaTypeController {
  constructor(private readonly maTypeService: MaTypeService) {}

  @Post()
  create(@Body() createMaTypeDto: Prisma.maTypeCreateInput) {
    return this.maTypeService.create(createMaTypeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.maTypeUpdateInput) {
    return this.maTypeService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maTypeService.remove(+id);
  }
  @Get('active')
  findActive() {
    return this.maTypeService.findActive();
  }
  @Get('many')
  findMany(@Param('condition') condition: Prisma.maTypeFindFirstArgs) {
    return this.maTypeService.findMany(condition);
  }
  @Get(':id')
  findOne(@Param('condition') condition: Prisma.maTypeFindFirstArgs) {
    return this.maTypeService.findOne(condition);
  }

  @Get()
  findAll() {
    return this.maTypeService.findAll();
  }
}
