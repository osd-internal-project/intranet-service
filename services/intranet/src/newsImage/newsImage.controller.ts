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

@Controller('news-image')
export class NewsImageController {
  constructor(private readonly newsImageService: NewsImageService) {}

  // กำหนดการตั้งค่าในการอัปโหลดไฟล์
  @Post(':newsId')
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
  uploadFile(@Param('newsId') newsId :string, @UploadedFile() file: Express.Multer.File) {
    console.log(file); 
    if (!file) {
      throw new Error('File is undefined');
    }
    const data = {
      newsId: +newsId,
      fileimageName: file.originalname,
      fileimagePath: file.path,
    } as Prisma.newsImageCreateInput;
    return this.newsImageService.create({data:data});
  }


  @Get()
  findAll(@Query() query) {
    return this.newsImageService.findAll(query);
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
