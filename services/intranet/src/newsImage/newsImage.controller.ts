import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { NewsImageService } from './newsImage.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
const uploadpath = process.env.PATH_MOUNTDIR_IMAGES_UPLOAD;
const MAX_IMAGES = 3;
@Controller('news-image')
export class NewsImageController {
  constructor(private readonly newsImageService: NewsImageService) {}
  
  @Post(':newsId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_IMAGES_UPLOAD}/newsimage`,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(
    @Param('newsId') newsId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is undefined');
    }
    console.log(uploadpath)
    const data = {
      newsId: +newsId,
      fileimageName: file.originalname,
      fileimagePath: file.path,
      fileName: file.filename,
    } as Prisma.newsImageCreateInput;
    return this.newsImageService.create({ data: data });
  }

  @Get()
  findAll(@Query('newsId') newsId?: string) {
    if (newsId) {
      return this.newsImageService.findAll({ where: { newsId: +newsId } });
    }
    return this.newsImageService.findAll({});
  }

  @Get(':newsId')
  findOne(@Param('newsId') newsId: string) {
    return this.newsImageService.findOne(+newsId);
  }

  @Patch(':newsId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_IMAGES_UPLOAD}/newsimage`,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async updateFile(
    @Param('newsId') newsId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is undefined');
    }
    const data = {
      fileimageName: file.originalname,
      fileimagePath: file.path,
      fileName: file.filename,
    } as Prisma.newsImageUpdateInput;

    return this.newsImageService.update(+newsId, {
      data,
      where: {
        newsId: 0,
      },
    });
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: string) {
    return this.newsImageService.remove(+newsId);
  }
}
