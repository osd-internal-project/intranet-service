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
} from '@nestjs/common';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MasterProductImageService } from './master-product-image.service';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Controller('master-product-image')
export class MasterProductImageController {
  constructor(
    private readonly masterProductImageService: MasterProductImageService,
  ) {}

  @Post('/images/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/images-master-product`,
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFilesAppointment(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    let Id = Number(id);
    return this.masterProductImageService.create(Id, images);
  }

  @Get('/get_image')
  @UseInterceptors(FileInterceptor('image'))
  async getimage(@Query('image') image: any, @Res() res: Response) {
    try {
      const imagePath = join(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/images-master-product`,
        `${image}`,
      );
      res.sendFile(`${imagePath}`);
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/image.jpg', { root: './public' });
    }
  }

  @Delete('/delete-image-masterproduct')
  async removeImage(@Body('imageMasterProduct') imageMasterProduct: string) {
    return await this.masterProductImageService.removeImage(
      +imageMasterProduct,
    );
  }
  // @Get('/images/:id')
  // getFilesAppointment(@Param('id') id: string) {
  //   return this.masterProductImageService.getFilesAppointment(id);
  // }

  // @Get()
  // findAll() {
  //   return this.masterProductImageService.findAll();
  // }

  // @Patch()
  // update(
  //   @Body('id') id: number,
  //   @Body('data') data: Prisma.images_locationUpdateManyArgs,
  // ) {
  //   return this.masterProductImageService.update(id, data);
  // }

  // @Delete()
  // remove(@Body('id') id: number) {
  //   return this.masterProductImageService.remove(id);
  // }
}
