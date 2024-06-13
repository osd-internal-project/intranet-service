import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Param,
  Res,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';

import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { UserInterceptor } from '@inventory/share';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/get_image/company')
  @UseInterceptors(FileInterceptor('image'))
  async getimage(@Query('image') image: any, @Res() res: Response) {
    try {
      const imagePath = join(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/location`,
        `${image}`,
      );
      res.sendFile(`${imagePath}`, { root: './' });
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
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/location`,
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}`;
          callback(null, filename);
        },
      }),
    }),
    UserInterceptor,
  )
  async uploadFilesAppointment(
    @Param('id') id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.locationService.createImages(id, images);
  }

  @Post()
  async create(@Body('data') data: any, @Body('inventory') inventory: any[]) {
    return this.locationService.create(data, inventory);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Post('find-by-user-group')
  findByUserGroup(@Body('userGroup') userGroup: string[]) {
    return this.locationService.findByUserGroup(userGroup);
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.locationFindManyArgs) {
    return this.locationService.findMany(condition);
  }

  @Patch()
  update(
    @Body('id') id: number,
    @Body('data') data: Prisma.locationUpdateInput,
  ) {
    return this.locationService.update(id, data);
  }

  @Delete()
  remove(@Body('locationId') locationId: string, @Body('id') id: number) {
    return this.locationService.remove(locationId, id);
  }
  @Delete('/delete-image')
  removeImage(@Body('images_location') images_location: string) {
    return this.locationService.removeImage(images_location);
  }
}
