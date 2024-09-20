import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { SlideImageService } from './slide-image.service';
import { Prisma } from '@prisma/client';
import { createReadStream, promises as fsPromises } from 'fs';
import { extname, join } from 'path';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import config from '../configs';

const pathMountDirUpload = config().pathMountDirUpload;

@Controller('slide-image')
export class SlideImageController {
  constructor(private readonly SlideImageService: SlideImageService) {}

  @Post('/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${pathMountDirUpload}/slide-image`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);

          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async createSlide(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('type') type: string,
    @Body('createdByName') createdByName: string,
  ) {
    if (id && type && files.length > 0) {
      const data = {
        fileId: files[0].filename,
        filePath: files[0].path,
        fileType: files[0].mimetype,
        fileName: Buffer.from(files[0].originalname, 'latin1').toString('utf8'),
        createdByName,
      } as Prisma.slideImageCreateInput;
      return this.SlideImageService.createfiles(data);
    }
  }

  @Get()
  findAll() {
    return this.SlideImageService.findAll();
  }

  @Post()
  create(@Body() data: Prisma.slideImageCreateInput) {
    return this.SlideImageService.create(data);
  }

  @Patch(':fileId')
  update(
    @Param('fileId') fileId: string,
    @Body() data: Prisma.slideImageUpdateInput,
  ) {
    return this.SlideImageService.update(fileId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.SlideImageService.remove(+id);
  }

  // @Get('uploads/image/:file')
  // getFile(@Param('file') filename: string, @Res() res: Response): void {
  //   const filePath = join('./upload/image', filename);
  //   fsPromises
  //     .access(filePath)
  //     .then(() => {
  //       const file = createReadStream(filePath);
  //       res.setHeader('Content-Type', 'image/jpeg');
  //       res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  //       file.pipe(res);
  //     })
  //     .catch(() => {
  //       res.status(404).send('File not found');
  //     });
  // }

  // @Get('/slide-image/:file')
  // getFileSlide(@Param('file') filename: string, @Res() res: Response): void {
  //   const filePath = join(`./undefined/slide-image`, filename);
  //   fsPromises
  //     .access(filePath)
  //     .then(() => {
  //       const file = createReadStream(filePath);
  //       res.setHeader('Content-Type', 'image/jpeg');
  //       res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  //       file.pipe(res);
  //     })
  //     .catch(() => {
  //       res.status(404).send('File not found');
  //     });
  // }

  @Get('/undefined/slide-image/:file')
  async getimage(@Param('file') fileId: string, @Res() res: Response) {
    const image = await this.SlideImageService.findImage(fileId); 
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imagePath = join(
      `${pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }

  // @Get('undefined/slide-image/:file')
  // async getFileSlide(
  //   @Param('file') filename: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const primaryFilePath = join('./undefined/slide-image', filename);
  //   const secondaryFilePath = join(
  //     './undefined/slide-image/19e0963b-e57a-4fd3-bb8e-303dc192d22a.png',
  //   );

  //   try {
  //     await fsPromises.access(primaryFilePath);
  //     const file = createReadStream(primaryFilePath);
  //     res.setHeader('Content-Type', 'image/jpeg');
  //     res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  //     file.pipe(res);
  //   } catch {
  //     try {
  //       await fsPromises.access(secondaryFilePath);
  //       const file = createReadStream(secondaryFilePath);
  //       res.setHeader('Content-Type', 'image/jpeg');
  //       res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  //       file.pipe(res);
  //     } catch {
  //       res.status(404).send('File not found');
  //     }
  //   }
  // }
}
