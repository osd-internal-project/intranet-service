import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
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
    const lastRow = await this.masterProductCategoriesService.findOne({
      orderBy: {
        id: 'desc',
      },
    });
    let categoryCode = null;
    if (lastRow) {
      categoryCode = 'INV-C-' + String(lastRow.id + 1).padStart(6, '0');
    } else {
      categoryCode = 'INV-C-000001';
    }
    return this.masterProductCategoriesService.create({
      categoryCode: categoryCode,
      ...data,
    });
  }

  @Get()
  findAll() {
    return this.masterProductCategoriesService.findAll();
  }

  @Get('count')
  count() {
    return this.masterProductCategoriesService.count();
  }

  @Post('condition')
  findMany(
    @Body('condition') condition: Prisma.masterProductCategoriesFindManyArgs,
  ) {
    return this.masterProductCategoriesService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterProductCategoriesUpdateInput,
  ) {
    return this.masterProductCategoriesService.update(id, data);
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    const id = Number(param);
    return this.masterProductCategoriesService.remove(id);
  }
}
