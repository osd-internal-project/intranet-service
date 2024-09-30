import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { maCarWrapupImageService } from './maCarWrapupImage.service';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

const uploadpath = process.env.PATH_MOUNTDIR_IMAGES_UPLOAD;
const MAX_IMAGES = 3;
@Controller('ma-car-wrapup-image')
export class maCarWrapupImageController {
  constructor(
    private readonly maCarWrapupImageService: maCarWrapupImageService,
  ) {}

  @Post(':carWrapupId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./uploads/maCarImage`,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(
    @Param('carWrapupId') carWrapupId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is undefined');
    }
    const data = {
      carWrapupId: carWrapupId,
      mafileNameImage: file.originalname,
      mafilePart: file.path,
      maName: file.filename,
    } as Prisma.maCarWrapupImageCreateInput;
    return this.maCarWrapupImageService.create({ data: data });
  }

  @Get()
  findAll(@Query('idwarpupImage') idwarpupImage: number) {
    if (idwarpupImage) {
      return this.maCarWrapupImageService.findAll({
        where: { idwarpupImage: +idwarpupImage },
      });
    }
    return this.maCarWrapupImageService.findAll({});
  }

  @Get(':idwarpupImage')
  findOne(@Param('idwarpupImage') idwarpupImage: number) {
    return this.maCarWrapupImageService.findOne(+idwarpupImage);
  }

  @Patch(':carWrapupId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./uploads/maCarImage`,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async updateFile(
    @Param('carWrapupId') carWrapupId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is undefined');
    }

    // Get the existing images related to the carWrapupId
    const existingImages = this.maCarWrapupImageService.findMany({
      where: { idwarpupImage : +carWrapupId },
      orderBy: { createdAt: 'asc' },
    });

    if (Array.isArray(existingImages) && existingImages.length >= 3) {
      // ถ้ามีภาพเกิน 3 ภาพ ให้หยุดการอัพเดทและโยนข้อยกเว้น
      throw new BadRequestException('Cannot upload more than 3 images.');
    }

    const data = {
      mafileNameImage: file.originalname,
      mafilePart: file.path,
      maName: file.filename,
    } as Prisma.maCarWrapupImageUpdateInput;

    return this.maCarWrapupImageService.update(carWrapupId, {
      data,
      where: {
        idwarpupImage: +carWrapupId,
      },
    });
  }
  @Delete(':idwarpupImage')
  remove(@Param('idwarpupImage') idwarpupImage: number) {
    return this.maCarWrapupImageService.remove(+idwarpupImage);
  }

  @Get('uploads/maCarImage/:file')
  getFileSlide(
    @Param('file') mafileNameImage: string,
    @Res() res: Response,
  ): void {
    const filePath = join('./uploads/maCarImage', mafileNameImage);
    fsPromises
      .access(filePath)
      .then(() => {
        const file = createReadStream(filePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader(
          'Content-Disposition',
          `inline; filename="${mafileNameImage}"`,
        );
        file.pipe(res);
      })
      .catch(() => {
        res.status(404).send('File not found');
      });
  }
}
