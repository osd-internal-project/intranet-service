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
  Res,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { handbookFileService } from './handbookFile.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('handbook-file')
export class handbookFileController {
  constructor(private readonly handbookFileService: handbookFileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./uploads/handbookfile`,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  
  
  
  uploadFile(
    // @Param('handbookid') handbookid: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    if (!file) {
      throw new Error('File is undefined');
    }
console.log(`${process.env.PATH_MOUNTDIR_IMAGES_UPLOAD}/handbookfile`);

    console.log(file.path);
    const data = {
      fileName: body.fileName,
      filetype: body.filetype,
      author: body.author,
      fileoriginalName: file.originalname,
      fileLocation: file.path,
      fileId: file.filename,
    } as Prisma.handbookFileCreateInput;
    Logger.debug('data',data)
    return this.handbookFileService.create({ data });
  }

  @Get()
  findAll(@Query('handbookid') handbookid?: number) {
    if (handbookid) {
      return this.handbookFileService.findAll({
        where: { handbookid: +handbookid },
      });
    }
    console.log(process.env.PATH_MOUNTDIR_IMAGES_UPLOAD);
    return this.handbookFileService.findAll({});
  }

  @Get(':handbookid')
  findOne(@Param('handbookid') handbookid: number) {
    return this.handbookFileService.findOne(+handbookid);
  }

  @Patch(':handbookid')
  update(
    @Param('handbookid') handbookid: number,
    @Body() condition: Prisma.handbookFileUpdateArgs,
  ) {
    return this.handbookFileService.update(+handbookid, condition);
  }

  @Delete(':handbookid')
  remove(@Param('handbookid') handbookid: number) {
    return this.handbookFileService.remove(+handbookid);
  }

  @Get('/get-file/:id')
  @UseInterceptors(FileInterceptor('files'))
  async getfilesByFileName(
    @Param('id') handbookid: string,
    @Res() res: Response,
  ) {
    try {
      const file = await this.handbookFileService.findOnes({
        where: { handbookid: +handbookid },
      });
      const filesPath = join(`${file.fileLocation}`);
      res.sendFile(`${filesPath}`, { root: './' });
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/files.jpg', { root: './public' });
    }
  }

  @Get("downloadfiles")
  findHandbookFilesAll(@Query('handbookid') handbookid?: number) {
    if (handbookid) {
      return this.handbookFileService.findAll({
        where: { handbookid: +handbookid },
      });
    }
    return this.handbookFileService.findHandbookFilesAll({});
  }
}
