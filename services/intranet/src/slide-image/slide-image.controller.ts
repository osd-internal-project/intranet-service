import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SlideImageService } from './slide-image.service';
import { Prisma } from '@prisma/client';
import { createReadStream, promises as fsPromises } from 'fs';
import { extname, join } from 'path';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('slide-image')
export class SlideImageController {
  constructor(private readonly SlideImageService: SlideImageService) {}

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/slide-image`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async createSlide(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type: string,
  ) {
    if (id && type && files.length > 0) {
      const data = {
        filePath: files[0].path,
        fileType: files[0].mimetype,
        fileName: files[0].originalname,
      } as Prisma.slideImageCreateInput;
      return this.SlideImageService.createfiles(data);
    }
  }

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

  @Get('undefined/slide-image/:file')
  getFileSlide(@Param('file') filename: string, @Res() res: Response): void {
    const filePath = join('./undefined/slide-image', filename);
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
