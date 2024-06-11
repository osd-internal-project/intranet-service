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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MaTaskFilesService } from './ma-task-files.service';
import { CreateMaTaskFileDto } from './dto/create-ma-task-file.dto';
import { UpdateMaTaskFileDto } from './dto/update-ma-task-file.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { extname, join } from 'path';
@Controller('ma-task-files')
export class MaTaskFilesController {
  constructor(private readonly maTaskFilesService: MaTaskFilesService) {}

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/ma-task-files`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async craeateMaTaskFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type,
  ) {
    if (id && type && files.length > 0) {
      const data = {
        maTaskId: +id,
        path: files[0].path,
        type: type,
        fileCode: files[0].filename,
        fileType: files[0].mimetype,
        fileName: files[0].originalname,
      } as Prisma.maTaskFilesCreateInput;
      return this.maTaskFilesService.create(data);
    }
    // const Id = Number(id);
    // return this.maTaskFilesService.create({ maTaskId });
  }

  @Get('many')
  findMany(@Param() query: object) {
    return this.maTaskFilesService.findMany(query);
  }
  @Get('/get-file/:id')
  @UseInterceptors(FileInterceptor('files'))
  async getfilesByFileName(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.maTaskFilesService.findOne({
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

  @Get(':id')
  findOne(@Param() query: object) {
    return this.maTaskFilesService.findOne(query);
  }
}
