import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsImageService } from './newsImage.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('newsImage')
export class NewsImageController {
  constructor(private readonly newsImageService: NewsImageService) {}

  @Post(':imageId')
  // @UseInterceptors(
  //   FilesInterceptor('files', 10, {
  //     storage: diskStorage({
  //       destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/ma-task-files`,
  //       filename: (req, file, callback) => {
  //         const fileCode = `${uuidv4()}`;
  //         const fileType = extname(file.originalname);
  //         callback(null, `${fileCode}${fileType}`);
  //       },
  //     }),
  //   }),
  // )
  // async craeateMaTaskFiles(
  //   @Param('id') id: string,
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body('type') type,
  // ) {
  //   if (id && type && files.length > 0) {
  //     const data = {
  //       maTaskId: +id,
  //       path: files[0].path,
  //       type: type,
  //       fileCode: files[0].filename,
  //       fileType: files[0].mimetype,
  //       fileName: files[0].originalname,
  //     } as Prisma.maTaskFilesCreateInput;
  //     return this.newsImageService.create(data);
  //   }
  //   // const Id = Number(id);
  //   // return this.maTaskFilesService.create({ maTaskId });
  // }
  create(@Body() data: Prisma.newsImageCreateArgs) {
    return this.newsImageService.create(data);
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
