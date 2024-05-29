import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  Param,
  UploadedFiles,
  Logger,
} from '@nestjs/common';
import { MasterProductService } from './master-product.service';
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('master-product')
export class MasterProductController {
  constructor(private readonly masterProductService: MasterProductService) {}

  @Post()
  async create(@Body('data') data: Prisma.masterProductCreateInput) {
    const res = await this.masterProductService.create(data);
    return res;
  }

  @Get()
  findAll() {
    return this.masterProductService.findAll();
  }

  @Get('count')
  count() {
    return this.masterProductService.count();
  }

  @Get('count-out-of-stock')
  countoutofstock() {
    return this.masterProductService.countoutofstock();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.masterProductWhereInput) {
    console.log(condition);
    return this.masterProductService.findMany(condition);
  }

  @Post('find-by-casno')
  findByCasNo(@Body('casno') casNo: string) {
    return this.masterProductService.findByCasNo(casNo);
  }

  @Post('inventory')
  findByInventoryId(
    @Body('inventoryId') inventoryId: number,
    @Body('condition') condition: Prisma.masterProductWhereInput,
    @Body('minimumstatus') minimumstatus: boolean,
  ) {
    return this.masterProductService.findByInventoryId(
      inventoryId,
      condition,
      minimumstatus,
    );
  }

  @Post('location')
  findByLocationId(
    @Body('locationId') locationId: number,
    @Body('condition') condition: Prisma.masterProductWhereInput,
    @Body('minimumStatus') minimumStatus: boolean,
  ) {
    return this.masterProductService.findBylocationId(
      locationId,
      condition,
      minimumStatus,
    );
  }

  @Post('inventory-find-by-product')
  findProductInInventoryByProductId(@Body('productId') productId: number) {
    return this.masterProductService.findProductInInventoryByProductId(
      productId,
    );
  }

  @Patch(':casno')
  update(
    @Param('casno') casNo: string,
    @Body('data') data: Prisma.masterProductUpdateInput,
  ) {
    return this.masterProductService.update(casNo, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterProductService.remove(id);
  }
}
