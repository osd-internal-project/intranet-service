import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InventoryLotService } from './inventory-lot.service';
import { Prisma } from '@prisma/client';
import { join } from 'path';
@Controller('inventory-lot')
export class InventoryLotController {
  constructor(private readonly inventoryLotService: InventoryLotService) {}

  @Post()
  create(@Body('data') data: Prisma.inventoryLotCreateInput) {
    return this.inventoryLotService.create(data);
  }

  @Get()
  findAll() {
    return this.inventoryLotService.findAll();
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.inventoryLotFindManyArgs) {
    return this.inventoryLotService.findMany(condition);
  }

  @Post('condition-expired-date')
  findExpired(@Body('condition') condition: Prisma.inventoryLotFindManyArgs) {
    return this.inventoryLotService.findMany(condition);
  }

  @Post('condition-first')
  findOne(@Body('condition') condition: Prisma.inventoryLotFindFirstArgs) {
    return this.inventoryLotService.findOne(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.inventoryLotUpdateInput,
  ) {
    return this.inventoryLotService.update(id, data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.inventoryLotService.remove(id);
  }
  @Get('find-usable-remain-by-inventorystock')
  findRemainOfStockUsable(@Query() params: any) {
    const { stockid } = params;
    return this.inventoryLotService.findRemainOfStockUsable(Number(stockid));
  }
  @Get('find-expired-remain-by-inventorystock')
  findSummaryOfStock(@Query() params: any) {
    const { stockid } = params;
    return this.inventoryLotService.findRemainOfStockExpired(Number(stockid));
  }

  @Post('find-by-inventory')
  findByInventoryID(
    @Body('inventoryId') inventoryId: number,
    @Body('condition') condition: any,
    @Body('difLotId') difLotId: number[],
    @Body('expiredStatus') expiredStatus: boolean,
  ) {
    return this.inventoryLotService.findByInventoryID(
      inventoryId,
      expiredStatus,
      difLotId,
      condition,
    );
  }

  @Post('find-before-expired')
  findBeforeExpired(@Body('location') locationIdList: number[]) {
    return this.inventoryLotService.findBeforeExpired(locationIdList);
  }

  @Post('count-before-expired')
  countBeforeExpired(@Body('group') groupList: string[]) {
    return this.inventoryLotService.countBeforeExpired(groupList);
  }

  @Get('/download/:id')
  async downloadfile(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.inventoryLotService.findFileByRecieveFileId(
      Number(id),
    );
    try {
      const filesPath = join(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/file-recieve`,
        `${data.idfile}`,
      );
      res.sendFile(`${filesPath}`, { root: './' });
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/files.jpg', { root: './public' });
    }
  }
}
