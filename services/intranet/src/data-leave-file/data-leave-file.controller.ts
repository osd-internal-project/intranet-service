import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DataLeaveFileService } from './data-leave-file.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';

@Controller('data-leave-file')
export class DataLeaveFileController {
  constructor(private readonly dataLeaveFileService: DataLeaveFileService) {}

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/data-leave-file`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async createDataLeaveFile(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type,
  ) {
    if (id && type && files.length > 0) {
      const data = {
        dataLeaveId: +id,
        path: files[0].path,
        type: type,
        fileCode: files[0].filename,
        fileType: files[0].mimetype,
        fileName: files[0].originalname,
      } as Prisma.dataLeaveFilesCreateInput;
      return this.dataLeaveFileService.create(data);
    }
  }

  @Get('many')
  findMany(@Param() query: object) {
    return this.dataLeaveFileService.findMany(query);
  }

  @Get('/get-file/:id')
  @UseInterceptors(FileInterceptor('files'))
  async getfilesByFileName(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.dataLeaveFileService.findOne({
        where: { id: +id },
      });
      const filesPath = join(`${file.path}`);
      res.sendFile(`${filesPath}`, { root: './' });
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/files.jpg', { root: './public' });
    }
  }

  @Get()
  findAll() {
    return this.dataLeaveFileService.findAll();
  }

  @Get(':id')
  findOne(@Param() query: object) {
    return this.dataLeaveFileService.findOne(query);
  }

  @Patch(':id')
  update(
    @Body('condition')
    condition: Prisma.dataLeaveFilesUpdateArgs,
  ) {
    return this.dataLeaveFileService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLeaveFileService.remove(+id);
  }
}
