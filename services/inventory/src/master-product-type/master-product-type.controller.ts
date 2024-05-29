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
import { MasterProductTypeService } from './master-product-type.service';
import { Prisma } from '@prisma/client';
@Controller('master-product-type')
export class MasterProductTypeController {
  constructor(
    private readonly masterProductTypeService: MasterProductTypeService,
  ) {}

  @Post()
  async create(@Body('data') data: Prisma.masterProductTypeCreateInput) {
    const lastRow = await this.masterProductTypeService.findOne({
      orderBy: {
        id: 'desc',
      },
    });
    let typeCode = null;
    if (lastRow) {
      typeCode = 'INV-T-' + String(lastRow.id + 1).padStart(6, '0');
    } else {
      typeCode = 'INV-T-000001';
    }
    return this.masterProductTypeService.create({
      typeCode: typeCode,
      ...data,
    });
    // return this.masterProductTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.masterProductTypeService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.masterProductTypeFindManyArgs) {
    console.log(condition);
    return this.masterProductTypeService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterProductTypeUpdateInput,
  ) {
    return this.masterProductTypeService.update(id, data);
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    const id = Number(param);
    return this.masterProductTypeService.remove(id);
  }
}
