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
import { CustomerFilesService } from './customer-files.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import { extname, join } from 'path';
@Controller('customer-files')
export class CustomerFilesController {
  constructor(private readonly customerFilesService: CustomerFilesService) {}

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/customer-files`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async craeateCustomerFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type,
  ) {
    if (id && type && files.length > 0) {
      const data = {
        customerProjectTicketId: +id,
        path: files[0].path,
        type: type,
        fileCode: files[0].filename,
        fileType: files[0].mimetype,
        fileName: Buffer.from(files[0].originalname, 'latin1').toString('utf8'),
      } as Prisma.customerFilesCreateInput;
      return this.customerFilesService.create(data);
    }
    // const Id = Number(id);
    // return this.customerFilesService.create({ customerId });
  }

  @Get('many')
  findMany(@Param() query: object) {
    return this.customerFilesService.findMany(query);
  }
  @Get('/get-file/:id')
  @UseInterceptors(FileInterceptor('files'))
  async getfilesByFileName(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.customerFilesService.findOne({
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
    return this.customerFilesService.findOne(query);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerFilesService.remove(+id);
  }
}
