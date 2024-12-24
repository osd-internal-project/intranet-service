import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { MasterProductCategoriesService } from './master-product-categories.service';
import { Prisma } from '@prisma/client';
@Controller('master-product-categories')
export class MasterProductCategoriesController {
  constructor(
    private readonly masterProductCategoriesService: MasterProductCategoriesService,
  ) {}

  @Post()
  async create(@Body('data') data: Prisma.masterProductCategoriesCreateInput) {
    return this.masterProductCategoriesService.create(data);
  }

  @Get()
  findAll() {
    return this.masterProductCategoriesService.findAll();
  }

  @Get('many')
  findMany(
    @Query('search') condition: Prisma.masterProductCategoriesFindManyArgs,
  ) {
    return this.masterProductCategoriesService.findMany(condition);
  }
  @Get(':id')
  findFirst(@Param('id') id: string) {
    return this.masterProductCategoriesService.findFirst(+id);
  }
  @Patch()
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.masterProductCategoriesUpdateInput,
  ) {
    return this.masterProductCategoriesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProductCategoriesService.remove(+id);
  }

  @Get('count')
  count() {
    return this.masterProductCategoriesService.count();
  }
}
