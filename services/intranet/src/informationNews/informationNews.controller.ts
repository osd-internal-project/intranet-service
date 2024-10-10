import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import {
  informationNewsService,
} from './informationNews.service';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
import configs from '../configs';
const PORT = configs();

@Controller('informationNews')
export class InformationController {
  constructor(
    private readonly informationNewsService: informationNewsService,
  ) {}

  @Post()
  create(@Body() data: Prisma.informationNewsCreateArgs) {
    return this.informationNewsService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.informationNewsService.findAll(query);
  }
  @Get('home/news')
  findNewsAll(@Query() query) {
    return this.informationNewsService.findNewsAll(query);
  }

  @Get(':newsId')
  findOne(@Param('newsId') newsId: number) {
    return this.informationNewsService.findOne(+newsId);
  }

  @Patch(':newsId')
  update(
    @Param('newsId') newsId: number,
    @Body() condition: Prisma.informationNewsUpdateArgs,
  ) {
    return this.informationNewsService.update(+newsId, condition);
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: number) {
    return this.informationNewsService.remove(+newsId);
  }

  @Get('/uploads/newsimage/:file')
  async getImage(@Param('file') fileName: string, @Res() res: Response) {
    const image = await this.informationNewsService.findImage(fileName);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${PORT.pathMountDirUpload}/newsimage`,
      `${image.fileName}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }
}
