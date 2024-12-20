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
import { VenderGroupService } from './vender-group.service';
import { Prisma } from '@prisma/client';
@Controller('vender-group')
export class VenderGroupController {
  constructor(private readonly venderGroupService: VenderGroupService) {}

  @Post()
  async create(@Body('data') data: Prisma.venderGroupCreateInput) {
    return this.venderGroupService.create(data);
  }

  @Get()
  findAll() {
    return this.venderGroupService.findAll();
  }
  @Get('count')
  count() {
    return this.venderGroupService.count();
  }

  @Get('many')
  findMany(@Body('many') condition: Prisma.venderGroupFindManyArgs) {
    return this.venderGroupService.findMany(condition);
  }

  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.venderGroupService.findFirst(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('data') venderGroup: Prisma.venderGroupUpdateInput,
  ) {
    return await this.venderGroupService.update(+id, venderGroup);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.venderGroupService.delete(+id);
  }
}
