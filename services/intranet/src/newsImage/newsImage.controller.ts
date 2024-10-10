import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { NewsImageService } from './newsImage.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import configs from '../configs';
const PORT = configs();

@Controller('news-image')
export class NewsImageController {
  constructor(private readonly newsImageService: NewsImageService) {}

  @Post(':newsId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${PORT.pathMountDirUpload}/newsimage`,
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
    const data = {
      newsId: +newsId,
      fileimageName: file.originalname,
      fileimagePath: file.path,
      fileName: file.filename,
    } as Prisma.newsImageCreateInput;
    return this.newsImageService.create({ data: data });
  }

  @Get()
  findAll(@Query('imageId') imageId?: number) {
    if (imageId) {
      return this.newsImageService.findAll({ where: { imageId: +imageId } });
    }
    return this.newsImageService.findAll({});
  }

  @Get(':imageId')
  findOne(@Param('imageId') imageId: number) {
    return this.newsImageService.findOne(+imageId);
  }

  @Patch(':newsId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/newsimage`,
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
    const existingImages = this.newsImageService.findMany({
      where: { newsId: +newsId },
      orderBy: { createdAt: 'asc' },
    });

    if (Array.isArray(existingImages) && existingImages.length >= 3) {
      // ถ้ามีภาพเกิน 3 ภาพ ให้หยุดการอัพเดทและโยนข้อยกเว้น
      throw new BadRequestException('Cannot upload more than 3 images.');
    }

    const data = {
      fileimageName: file.originalname,
      fileimagePath: `${process.env.PATH_MOUNTDIR_UPLOAD}/newsimage/${file.filename}`,
      fileName: file.filename,
    } as Prisma.newsImageUpdateInput;

    return this.newsImageService.update(+newsId, {
      data,
      where: {
        imageId: +newsId,
      },
    });
  }
  @Delete(':imageId')
  remove(@Param('imageId') imageId: number) {
    return this.newsImageService.remove(+imageId);
  }

  @Get('/uploads/newsimage:file')
  async getImage(@Param('file') fileName: string, @Res() res: Response) {
    const image = await this.newsImageService.findImage(fileName);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${PORT.pathMountDirUpload}/newsimage`,
      `${image.fileName}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }

  @Get('/undefined/newsimage/:file')
  async getimage(@Param('file') fileName: string, @Res() res: Response) {
    const image = await this.newsImageService.findImage(fileName);
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
