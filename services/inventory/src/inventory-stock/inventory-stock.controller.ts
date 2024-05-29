import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { InventoryStockService } from './inventory-stock.service';
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UserInterceptor } from '@inventory/share';
@Controller('inventory-stock')
export class InventoryStockController {
  constructor(private readonly inventoryStockService: InventoryStockService) {}

  @Post()
  create(
    @Body('data') data: any,
    @Body('inventoryId') inventoryId: string,
    @Body('masterProductId') masterProductId: string,
    @Body('inventoryName') inventoryName: string,
    @Body('uploadfiles') uploadfiles: any[],
  ) {
    return this.inventoryStockService.create(
      data,
      inventoryId,
      masterProductId,
      inventoryName,
    );
  }

  @Post('/images/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/file-recieve`,
        filename: (req, file, callback) => {
          const filename = `file-recieve-${uuidv4()}`;
          callback(null, filename);
        },
      }),
    }),
    UserInterceptor,
  )
  async uploadFilesAppointment(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.inventoryStockService.createImages(id, images);
  }

  @Get()
  findAll() {
    return this.inventoryStockService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.inventoryStockFindManyArgs) {
    return this.inventoryStockService.findMany(condition);
  }
  @Patch()
  update(
    @Body('inventoryId') inventoryid: number,
    @Body('productId') productid: number,
    @Body('data') data: Prisma.inventoryStockUpdateInput,
    @Body('masterProductId') masterProductId: string,
    @Body('inventoryName') inventoryName: string,
    @Body('casNo') casNo: string,
  ) {
    return this.inventoryStockService.update(
      inventoryid,
      productid,
      data,
      masterProductId,
      inventoryName,
      casNo,
    );
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.inventoryStockService.remove(id);
  }

  @Post('find-by-inventory/:inventoryId')
  findByInventoryId(@Param('inventoryId') inventoryId, @Body('data') data) {
    return this.inventoryStockService.findByInventoryId(inventoryId, data);
  }

  @Get('find-lot/:id')
  findLotById(@Param('id') id) {
    return this.inventoryStockService.findLotById(Number(id));
  }

  @Get('count-inventory-stock')
  countInventoryStock(@Query() params: any) {
    const { inventoryid, productid } = params;
    return this.inventoryStockService.countInventoryStock(
      Number(inventoryid),
      Number(productid),
    );
  }
}
