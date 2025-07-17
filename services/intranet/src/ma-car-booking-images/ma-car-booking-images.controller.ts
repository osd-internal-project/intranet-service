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
} from '@nestjs/common';
import { MaCarBookingImagesService } from './ma-car-booking-images.service';
import { CreateMaCarBookingImageDto } from './dto/create-ma-car-booking-image.dto';
import { UpdateMaCarBookingImageDto } from './dto/update-ma-car-booking-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { Prisma } from '@prisma/client';

@Controller('ma-car-booking-images')
export class MaCarBookingImagesController {
  constructor(
    private readonly maCarBookingImagesService: MaCarBookingImagesService,
  ) {}

  @Post('upload-images/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${process.env.PATH_MOUNTDIR_UPLOAD}/booking-car-images`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async createFileImage(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type,
  ) {
    if (id && type && files.length > 0) {
      console.log(files);

      const data = {
        idCarBookImage: +id,
        filePath: `${process.env.PATH_MOUNTDIR_UPLOAD}/booking-car-images/${files[0].filename}`,
        fileType: files[0].mimetype,
        fileName: Buffer.from(files[0].filename, 'latin1').toString('utf8'),
      } as Prisma.maCarBookImageCreateInput;
      return this.maCarBookingImagesService.create(data);
    }
  }

  @Post()
  create(@Body() createMaCarBookingImageDto: CreateMaCarBookingImageDto) {
    return this.maCarBookingImagesService.create(createMaCarBookingImageDto);
  }

  @Get()
  findAll() {
    return this.maCarBookingImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maCarBookingImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaCarBookingImageDto: UpdateMaCarBookingImageDto,
  ) {
    return this.maCarBookingImagesService.update(
      +id,
      updateMaCarBookingImageDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarBookingImagesService.remove(+id);
  }
}
