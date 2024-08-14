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
import { handbookFileService } from './handbookFile.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('handbook-file')
export class handbookFileController {
  constructor(private readonly handbookFileService: handbookFileService) {}

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/handbookfile`,  
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(@Param('id') id :string, @UploadedFile() file: Express.Multer.File) {
    console.log(file); 
    if (!file) {
      throw new Error('File is undefined');
    }
    const data = {
      id: +id,
      fileName: file.originalname,
      fileLocation: file.path,
    } as Prisma.handbookFileCreateInput;
    return this.handbookFileService.create({data:data});
  }

  @Get()
  findAll(@Query() query) {
    return this.handbookFileService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.handbookFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() condition: Prisma.handbookFileUpdateArgs,
  ) {
    
    return this.handbookFileService.update(+id, condition);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.handbookFileService.remove(+id);
  }
}
