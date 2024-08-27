import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { SlideImageService } from './slide-image.service';
import { Prisma } from '@prisma/client';
import { createReadStream, promises as fsPromises } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('slide-image')
export class SlideImageController {
  constructor(private readonly SlideImageService: SlideImageService) {}

  @Get()
  findAll() {
    return this.SlideImageService.findAll();
  }

  @Post()
  create(@Body() data: Prisma.slideImageCreateInput) {
    return this.SlideImageService.create(data);
  }

  @Patch(':fileId')
  update(
    @Param('fileId') fileId: string,
    @Body() data: Prisma.slideImageUpdateInput,
  ) {
    return this.SlideImageService.update(fileId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.SlideImageService.remove(+id);
  }

  @Get('uploads/image/:file')
  getFile(@Param('file') filename: string, @Res() res: Response): void {
    const filePath = join('./upload/image', filename);
    fsPromises
      .access(filePath)
      .then(() => {
        const file = createReadStream(filePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        file.pipe(res);
      })
      .catch(() => {
        res.status(404).send('File not found');
      });
  }
  
}
