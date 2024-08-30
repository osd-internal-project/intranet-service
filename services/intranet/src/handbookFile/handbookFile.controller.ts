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

  @Post(':idbook')
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
  uploadFilehandbookFile(
    @Param('idbook') idbook: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);

    if (!file) {
      throw new Error('File is undefined');
    }
    const data = {
      idbook: +idbook,
      fileName: file.filename,
      fileLocation: file.path,
    } as Prisma.handbookFileCreateInput;
    return this.handbookFileService.create({ data: data });
  }

  @Get()
  findAll(@Query('idbook') idbook?: number) {
    if (idbook) {
      return this.handbookFileService.findAll({ where: { idbook: +idbook } });
    }
    return this.handbookFileService.findAll({});
  }

  @Get(':handbookid')
  findOne(@Param('handbookid') handbookid: number) {
    return this.handbookFileService.findOne(+handbookid);
  }

  @Patch(':idbook')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_IMAGES_UPLOAD}/handbookfile`,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async updateFile(
    @Param('idbook') idbook: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is undefined');
    }

    // Get the existing images related to the idbook
    const existingImages = this.handbookFileService.findMany({
      where: { idbook: +idbook },
      orderBy: { createdAt: 'asc' },
    });

    if (Array.isArray(existingImages) && existingImages.length >= 1) {
      // ถ้ามีภาพเกิน 3 ภาพ ให้หยุดการอัพเดทและโยนข้อยกเว้น
      throw new BadRequestException('Cannot upload more than 1 file.');
    }

    const data = {
      fileimageName: file.originalname,
      fileimagePath: file.path,
      fileName: file.filename,
    } as Prisma.newsImageUpdateInput;

    return this.handbookFileService.update(+idbook, {
      data,
      where: {
        handbookid: +idbook,
      },
    });
  }

  @Delete(':handbookid')
  remove(@Param('handbookid') handbookid: number) {
    return this.handbookFileService.remove(+handbookid);
  }

  @Get('/get-file/:id')
  @UseInterceptors(FileInterceptor('files'))
  async getfilesByFileName(
    @Param('id') handbookid: number,
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
}
