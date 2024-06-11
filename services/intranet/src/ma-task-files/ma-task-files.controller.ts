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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MaTaskFilesService } from './ma-task-files.service';
import { CreateMaTaskFileDto } from './dto/create-ma-task-file.dto';
import { UpdateMaTaskFileDto } from './dto/update-ma-task-file.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { extname } from 'path';
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
    Logger.debug(id, type, files);
    // Logger.debug(id, body, files);
    if (id && type && files.length > 0) {
      const data = {
        maTaskId: +id,
        path: files[0].path,
        type: type,
        fileCode: files[0].filename,
        fileType: extname(files[0].path),
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
  @Get()
  findAll() {
    return this.maTaskFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param() query: object) {
    return this.maTaskFilesService.findOne(query);
  }
}
