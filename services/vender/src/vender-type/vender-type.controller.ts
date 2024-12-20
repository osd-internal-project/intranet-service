import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Logger,
  Param,
} from '@nestjs/common';
import { VenderTypeService } from './vender-type.service';
import { Prisma } from '@prisma/client';
@Controller('vender-type')
export class VenderTypeController {
  constructor(private readonly venderTypeService: VenderTypeService) {}

  @Post()
  async create(@Body('data') data: Prisma.venderTypeCreateInput) {
    return this.venderTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.venderTypeService.findAll();
  }
  @Get('count')
  count() {
    return this.venderTypeService.count();
  }

  @Get('many')
  findMany(@Body('many') condition: Prisma.venderTypeFindManyArgs) {
    return this.venderTypeService.findMany(condition);
  }

  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.venderTypeService.findFirst(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('data') venderType: Prisma.venderTypeUpdateInput,
  ) {
    return await this.venderTypeService.update(+id, venderType);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.venderTypeService.delete(+id);
  }
}
