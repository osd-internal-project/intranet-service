import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Prisma } from '@prisma/client';
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body('data') data: Prisma.brandCreateInput) {
    return this.brandService.create(data);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.brandFindManyArgs) {
    return this.brandService.findMany(condition);
  }

  @Patch()
  update(@Body('id') id: number, @Body('data') data: Prisma.brandUpdateInput) {
    return this.brandService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.brandService.remove(id);
  }
}
