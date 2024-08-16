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
} from '@nestjs/common';
import { NewsImageService } from './newsImage.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
const uploadpath =process.env.PATH_MOUNTDIR_IMAGES_UPLOAD
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
    console.log(process.env.PATH_MOUNTDIR_IMAGES_UPLOAD);
    if (!file) {
      throw new Error('File is undefined');
    }
    // console.log(uploadpath)
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

  @Get(':imageId')
  findOne(@Param('imageId') imageId: string) {
    return this.newsImageService.findOne(+imageId);
  }

  @Patch(':imageId')
  update(
    @Param('imageId') imageId: string,
    @Body() condition: Prisma.newsImageUpdateArgs,
  ) {
    return this.newsImageService.update(+imageId, condition);
  }

  @Delete(':imageId')
  remove(@Param('imageId') imageId: string) {
    return this.newsImageService.remove(+imageId);
  }
}
