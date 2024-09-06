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
import { informationNewsService } from './informationNews.service';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';

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

  @Get('undefined/newsimage/:file')
  getFileSlide(
    @Param('file') fileimageName: string,
    @Res() res: Response,
  ): void {
    const filePath = join('./undefined/newsimage', fileimageName);
    fsPromises
      .access(filePath)
      .then(() => {
        const file = createReadStream(filePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader(
          'Content-Disposition',
          `inline; filename="${fileimageName}"`,
        );
        file.pipe(res);
      })
      .catch(() => {
        res.status(404).send('File not found');
      });
  }
}
