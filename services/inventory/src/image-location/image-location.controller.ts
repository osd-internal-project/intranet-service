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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageLocationService } from './image-location.service';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Controller('image-location')
export class ImageLocationController {
  constructor(private readonly imagelocationService: ImageLocationService) {}

  @Post('/images/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/location`,
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFilesAppointment(
    @Param('id') id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    try {
      return this.imagelocationService.create(id, images);
    } catch (error) {
      throw new HttpException(
        'Failed to save files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Get('/images/:id')
  // getFilesAppointment(@Param('id') id: string) {
  //   return this.imagelocationService.getFilesAppointment(id);
  // }

  @Get()
  findAll() {
    return this.imagelocationService.findAll();
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.imagesLocationUpdateManyArgs,
  ) {
    return this.imagelocationService.update(Number(id), data);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.imagelocationService.remove(id);
  }
}
