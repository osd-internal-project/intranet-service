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
import { extname, join } from 'path';
import { Response } from 'express';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import configs from '../configs';
const PORT = configs();

@Controller('slide-image')
export class SlideImageController {
  constructor(private readonly SlideImageService: SlideImageService) {}

  @Get()
  findAll() {
    return this.SlideImageService.findAll();
  }

  @Get('order')
  findorder() {
    return this.SlideImageService.findorder();
  }

  @Get('/uploads/slide-image/:file')
  async getImage(@Param('file') fileId: string, @Res() res: Response) {
    const image = await this.SlideImageService.findImage(fileId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${PORT.pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }

  @Get('uploads/:id')
  async getimages(@Param('file') id: number, @Res() res: Response) {
    const image = await this.SlideImageService.findImages(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${PORT.pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }

  @Post('upload-image')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: `${PORT.pathMountDirUpload}/slide-image`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('createdByName') createdByName: string,
    @Body('createdById') createdById: string,
  ) {
    const data = {
      fileId: files[0].filename,
      filePath: files[0].path,
      fileType: files[0].mimetype,
      fileName: Buffer.from(files[0].originalname, 'latin1').toString('utf8'),
      createdByName,
      createdById,
    } as Prisma.slideImageCreateInput;
    await this.SlideImageService.createfiles(data);
  }

  // @Post()
  // create(@Body() data: Prisma.slideImageCreateInput) {
  //   return this.SlideImageService.create(data);
  // }

  @Patch(':fileId')
  update(
    @Param('fileId') fileId: string,
    @Body() data: Prisma.slideImageUpdateInput,
  ) {
    return this.SlideImageService.update(fileId, data);
  }

  @Patch('order/:fileId')
  updateTebleSlide(
    @Param('fileId') fileId: string,
    @Body() data: Prisma.slideImageUpdateInput,
  ) {
    return this.SlideImageService.updateTebleSlide(fileId, data);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.SlideImageService.remove(+id);
  // }

  @Delete(':id')
  async deleteImage(
    @Param('id') id: number,
    @Param('file') fileId: string,
    @Res() res: Response,
  ) {
    const image = await this.SlideImageService.findImage(fileId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${PORT.pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    try {
      await this.SlideImageService.remove(+id);
      await fs.unlink(imagePath);
      return res.status(200).json({ message: 'Image deleted success' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete image', error });
    }
  }
}
