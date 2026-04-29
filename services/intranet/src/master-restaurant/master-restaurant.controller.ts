import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { MasterRestaurantService } from './master-restaurant.service';
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('master-restaurant')
export class MasterRestaurantController {
  constructor(
    private readonly masterRestaurantService: MasterRestaurantService,
  ) {}

  // @Post()
  // create(
  //   @Body() createMasterRestaurantDto: Prisma.masterRestaurantCreateInput,
  // ) {
  //   return this.masterRestaurantService.create(createMasterRestaurantDto);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('items') items: string,
  ) {
    const parsedItems = JSON.parse(items);

    return this.masterRestaurantService.create(parsedItems, files);
  }

  @Get()
  findAll() {
    return this.masterRestaurantService.findAll();
  }

  @Post('data-table')
  findMany(@Body('condition') conditions: Prisma.masterRestaurantFindManyArgs) {
    return this.masterRestaurantService.findMany(conditions);
  }

  @Get('download/:fileName')
  async download(@Param('fileName') fileName: string, @Res() res: Response) {
    const bucket = 'res-bucket';
    const stream = await this.masterRestaurantService.getFile(bucket, fileName);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(
        fileName,
      )}"`,
    });

    stream.pipe(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterRestaurantService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('items') items: string,
  ) {
    const parsedItems = JSON.parse(items);
    return this.masterRestaurantService.update(+id, parsedItems, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterRestaurantService.remove(+id);
  }
}
