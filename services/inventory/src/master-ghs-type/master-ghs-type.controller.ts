import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  Res,
  UploadedFiles,
  Logger,
} from '@nestjs/common';
import { MasterGhsTypeService } from './master-ghs-type.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { UserInterceptor } from '@inventory/share';
@Controller('master-ghs-type')
export class MasterGhsTypeController {
  constructor(private readonly masterGhsTypeService: MasterGhsTypeService) {}

  @Get('/get_image/ghs')
  @UseInterceptors(FileInterceptor('image'))
  async getimage(@Query('image') image: any, @Res() res: Response) {
    try {
      const imagePath = join(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/ghs`,
        `${image}`,
      );
      res.sendFile(`${imagePath}`);
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/image.jpg', { root: './public' });
    }
  }
  @Post('/images/:id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/ghs`,
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}}`;
          callback(null, filename);
        },
      }),
    }),
    UserInterceptor,
  )
  async uploadFilesImage(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.masterGhsTypeService.createImages(id, images);
  }

  @Post()
  create(@Body('data') data: Prisma.masterGhsTypeCreateInput) {
    return this.masterGhsTypeService.create(data);
  }

  @Get()
  findAll() {
    return this.masterGhsTypeService.findAll();
  }

  @Post('condition')
  async findMany(
    @Body('condition') condition: Prisma.masterGhsTypeFindManyArgs,
  ) {
    return await this.masterGhsTypeService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.masterGhsTypeUpdateInput,
  ) {
    return this.masterGhsTypeService.update(id, data);
  }

  @Delete()
  remove(@Body('ghsId') ghsId: string, @Body('id') id: number) {
    return this.masterGhsTypeService.remove(id, ghsId);
  }
  @Delete('/delete-image-ghs')
  async removeImage(@Body('imageGhs') imageGhs: string) {
    return await this.masterGhsTypeService.removeImage(imageGhs);
  }
}
