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

  @Get('barcode/:barcode')
  findOneByBarcode(@Param('barcode') barcode: string) {
    return this.masterProductService.findOneByBarcode(barcode);
  }

  @Get(':prdId')
  findOne(
    @Query() query: Prisma.masterProductWhereInput,
    @Param('prdId') prdId: string,
  ) {
    return this.masterProductService.findOne(prdId, query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: Prisma.masterProductUpdateInput,
  ) {
    return this.masterProductService.update(+id, updateUnitDto);
  }

  @Patch('total-qty/:id')
  updateQty(
    @Param('id') id: string,
    @Body() updateUnitDto: { totalQty: number },
  ) {
    return this.masterProductService.updateQty(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProductService.remove(+id);
  }
}
