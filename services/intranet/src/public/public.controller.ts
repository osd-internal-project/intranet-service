import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';
import configs from 'src/configs';
const PORT = configs();
@Controller('public')
export class PublicController {
  @Get('news-image/:filename')
  getNewsImageFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): void {
    const file = createReadStream(
      join(`${PORT.pathMountDirUpload}/newsimage`, filename),
    );
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `inline; filename="${file}"`,
    });
    file.pipe(res);
  }

  @Get('/handbook-file/:fileId')
  getHandbookFile(
    @Param('fileId') fileId: string,
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ): void {
    const filePath = join(`${PORT.pathMountDirUpload}/handbookfile`, fileId);
    const file = createReadStream(filePath);
    const fileNewName = decodeURIComponent(fileName);
    console.log(fileNewName, filePath);
    file.on('error', (err) => {
      console.error('Error:', err);
      return res.status(404).send('File not found');
    });
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="export.pdf"`,
    });
    file.pipe(res);
  }

  @Get('ma-car-wrapup-image/:maName')
  getmaCarWrapupImage(
    @Param('maName') maName: string,
    @Res() res: Response,
  ): void {
    console.log(maName);
    const file = createReadStream(
      join(`${PORT.pathMountDirUpload}/maCarImage`, maName),
    );
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `inline; fileName="${file}"`,
    });
    file.pipe(res);
  }
}
