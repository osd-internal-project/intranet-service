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
import { MasterProductService } from './master-product.service';
import { Prisma } from '@prisma/client';

@Controller('master-product')
export class MasterProductController {
  constructor(private readonly masterProductService: MasterProductService) {}

  @Post()
  create(@Body() data: Prisma.masterProductCreateInput) {
    console.log(data);
    return this.masterProductService.create(data);
  }

  @Get()
  findAll(
    @Query() query: Prisma.masterProductWhereInput,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.masterProductService.findAll(query, +skip, +take);
  }

  @Get(':id')
  findOne(
    @Query() query: Prisma.masterProductWhereInput,
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('id') id: string,
  ) {
    return this.masterProductService.findOne(+id, query, +skip, +take);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: Prisma.masterProductUpdateInput,
  ) {
    return this.masterProductService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProductService.remove(+id);
  }
}
