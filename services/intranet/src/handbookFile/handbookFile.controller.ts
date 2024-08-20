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

  @Post(':handbookid')
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
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { fileName: string; filetype: string; status: string },
  ) {
    console.log(file);
    console.log(body);
    if (!file) {
      throw new Error('File is undefined');
    }
    const data = {
      fileName: body.fileName, // ใช้ชื่อไฟล์จากฟอร์ม
      fileLocation: file.path,
      filetype: body.filetype,
      status: body.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'author_name',
    } as unknown as Prisma.handbookFileCreateInput;
    return this.handbookFileService.create({ data });
  }

  @Get()
  findAll(@Query() query) {
    return this.handbookFileService.findAll(query);
  }

  @Get(':handbookid')
  findOne(@Param('handbookid') handbookid: number) {
    return this.handbookFileService.findOne(+handbookid);
  }

  @Patch(':handbookid')
  update(
    @Param('handbookid') handbookid: string,
    @Body() condition: Prisma.handbookFileUpdateArgs,
  ) {
    return this.handbookFileService.update(+handbookid, condition);
  }

  @Delete(':handbookid')
  remove(@Param('handbookid') handbookid: number) {
    return this.handbookFileService.remove(+handbookid);
  }
}
