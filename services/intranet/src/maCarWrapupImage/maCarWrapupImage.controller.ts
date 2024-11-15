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
import configs from 'src/configs';
const PORT = configs();
@Controller('ma-car-wrapup-image')
export class maCarWrapupImageController {
  constructor(
    private readonly maCarWrapupImageService: maCarWrapupImageService,
  ) {}

  @Post(':carWrapupId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${PORT.pathMountDirUpload}/maCarImage`,
        filename: (req, file, callback) => {
          const fileType = file.originalname;
          callback(null, `${fileType}`);
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
    const fileType = extname(file.originalname);
    const fileName = file.filename;
    const data = {
      carWrapupId: carWrapupId,
      fileName: fileName,
      filePath: file.path,
      fileType: fileType,
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

  @Get('/get_image/:carWrapupID')
  @UseInterceptors(FileInterceptor('image'))
  async getimage(
    @Param('carWrapupID') carWrapupID: string,
    @Res() res: Response,
  ) {
    const data = await this.maCarWrapupImageService.findOne(+carWrapupID);
    try {
      const imagePath = join(
        `${PORT.pathMountDirUpload}/maCarImage`,
        `${data.fileName}`,
      );
      console.log(imagePath);
      res.sendFile(`${imagePath}`);
    } catch (error) {
      res
        .status(404)
        .sendFile('path/to/default/image.jpg', { root: './public' });
    }
  }

  @Patch(':carWrapupId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${PORT.pathMountDirUpload}/maCarImage`,
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
      where: { idwarpupImage: +carWrapupId },
      orderBy: { createdAt: 'asc' },
    });

    if (Array.isArray(existingImages) && existingImages.length >= 3) {
      throw new BadRequestException('Cannot upload more than 3 images.');
    }

    const data = {
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.filename,
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
    const filePath = join(
      `${PORT.pathMountDirUpload}/maCarImage`,
      mafileNameImage,
    );
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
