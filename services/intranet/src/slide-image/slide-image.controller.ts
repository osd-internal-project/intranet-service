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
import * as fs from 'fs';
import { unlink } from 'node:fs/promises';
const pathMountDirUpload = config().pathMountDirUpload;

@Controller('slide-image')
export class SlideImageController {
  constructor(private readonly SlideImageService: SlideImageService) {}

  // @Post('/:id')
  // @UseInterceptors(
  //   FilesInterceptor('files', 10, {
  //     storage: diskStorage({
  //       destination: `${pathMountDirUpload}/slide-image`,
  //       filename: (req, file, callback) => {
  //         const fileCode = `${uuidv4()}`;
  //         const fileType = extname(file.originalname);

  //         callback(null, `${fileCode}${fileType}`);
  //       },
  //     }),
  //   }),
  // )
  // async createSlide(
  //   @Param('id') id: string,
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body('type') type: string,
  //   @Body('createdByName') createdByName: string,
  //   @Body('createdById') createdById: string,
  // ) {
  //   if (id && type && files.length > 0) {
  //     const data = {
  //       fileId: files[0].filename,
  //       filePath: files[0].path,
  //       fileType: files[0].mimetype,
  //       fileName: Buffer.from(files[0].originalname, 'latin1').toString('utf8'),
  //       createdByName,
  //       createdById,
  //     } as Prisma.slideImageCreateInput;
  //     return this.SlideImageService.createfiles(data);
  //   }
  // }

  @Get()
  findAll() {
    return this.SlideImageService.findAll();
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
      `${pathMountDirUpload}/slide-image`,
      `${image.fileId}`,
    );
    try {
      await unlink(imagePath);
      await this.SlideImageService.remove(+id);
      return res.status(200).json({ message: 'Image deleted success' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete image', error });
    }
  }

  @Get('upload-image')
  async getimages(@Res() res: Response) {
    try {
      const images = await this.SlideImageService.findImageAll();
      if (!images || images.length === 0) {
        return res.status(404).json({ message: 'No images found' });
      }
      const fileIds = images.map((image) => image.fileId);
      const imagePaths = fileIds.map((fileId) => {
        return join(`${pathMountDirUpload}/slide-image`, fileId);
      });
      res.json(imagePaths);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

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

  @Get('/uploads/slide-image/:file')
  async getImage(@Param('file') fileId: string, @Res() res: Response) {
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

  @Post('upload-image')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
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
}
