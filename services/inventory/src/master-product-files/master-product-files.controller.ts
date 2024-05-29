import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
  Query,
  Res,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MasterProductFilesService } from './master-product-files.service';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as fs from 'fs';
@Controller('master-product-files')
export class MasterProductFilesController {
  constructor(
    private readonly masterProductFilesService: MasterProductFilesService,
  ) {}

  @Post('/files/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/files-master-product`,
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFilesAppointment(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const Id = Number(id);
    return this.masterProductFilesService.create(Id, files);
  }

  @Get('/get_files')
  @UseInterceptors(FileInterceptor('files'))
  async getfiles(@Query('files') files: any, @Res() res: Response) {
    try {
      const filesPath = join(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/files-master-product`,
        `${files}`,
      );
      res.sendFile(`${filesPath}`);
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/files.jpg', { root: './public' });
    }
  }
  // @Get('/files/:id')
  // getFilesAppointment(@Param('id') id: string) {
  //   return this.masterProductFilesService.getFilesAppointment(id);
  // }

  @Get('/download/:id')
  async downloadfile(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.masterProductFilesService.findById(Number(id));
    try {
      const filesPath = join(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/files-master-product`,
        `${data.idfile}`,
      );
      res.sendFile(`${filesPath}`);
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/files.jpg', { root: './public' });
    }
  }

  // @Patch()
  // update(
  //   @Body('id') id: number,
  //   @Body('data') data: Prisma.files_locationUpdateManyArgs,
  // ) {
  //   return this.masterProductFilesService.update(id, data);
  // }

  // @Delete()
  // remove(@Body('id') id: number) {
  //   return this.masterProductFilesService.remove(id);
  // }
}
