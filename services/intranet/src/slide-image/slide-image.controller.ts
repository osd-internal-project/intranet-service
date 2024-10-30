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
import { Prisma } from '@prisma/client';
import { extname, join } from 'path';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import configs from '../configs';
import { SlideImageService } from './slide-image.service';
const config = configs();

@Controller('slide-image')
export class SlideImageController {
  constructor(private readonly slideImageService: SlideImageService) {}

  @Get()
  findAll() {
    return this.slideImageService.findAll();
  }

  @Get('order')
  findorder() {
    return this.slideImageService.findorder();
  }

  @Get('/uploads/slide-image/:file')
  async getImage(@Param('file') fileId: string, @Res() res: Response) {
    const image = await this.slideImageService.findImage(fileId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${config.pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }

  @Get('uploads/:id')
  async getimages(@Param('file') id: number, @Res() res: Response) {
    const image = await this.slideImageService.findImages(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${config.pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    return res.sendFile(imagePath, { root: './' });
  }

  @Post('upload-image')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: `${config.pathMountDirUpload}/slide-image`,
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
    await this.slideImageService.createfiles(data);
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
    return this.slideImageService.update(fileId, data);
  }

  @Patch('order/:fileId')
  updateTebleSlide(
    @Param('fileId') fileId: string,
    @Body() data: Prisma.slideImageUpdateInput,
  ) {
    return this.slideImageService.updateTebleSlide(fileId, data);
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
    const image = await this.slideImageService.findImage(fileId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = join(
      `${config.pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    try {
      await this.slideImageService.remove(+id);
      await fs.unlink(imagePath);
      return res.status(200).json({ message: 'Image deleted success' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete image', error });
    }
  }
}
