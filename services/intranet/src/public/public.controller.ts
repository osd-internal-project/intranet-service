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
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { env } from 'process';
import { Response } from 'express';
import { Buffer } from 'buffer';
@Controller('public')
export class PublicController {
  @Get('news-image/:filename')
  getNewsImageFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): void {
    // const filesPath =  join(`./undefined/newsimage`,filename);
    const file = createReadStream(join(`./undefined/newsimage`, filename));
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `inline; filename="${file}"`,
    });
    file.pipe(res);
  }

  @Get('handbook-file/:filename')
  getHandbookFile(
    @Param('filename') fileName: string,
    @Query('fileoriginalName') fileoriginalName: string,
    @Res() res: Response,
  ): void {
    console.log('Filename:', fileName);
    console.log('Original Filename:', fileoriginalName);

    // Encode filename for safe usage in URLs
    const encodedFileName = encodeURIComponent(fileName);

    // Replace unsafe characters with underscores
    const safeOriginalFileName = (
      fileoriginalName || 'handbook-file.pdf'
    ).replace(/[^a-zA-Z0-9.\-_]/g, '_');

    // Decode the original file name back to its original form (in case it's Thai or another language)
    const decodedOriginalFileName =  encodeURIComponent(
      fileoriginalName || 'handbook-file.pdf',
    );

    console.log('Decoded Original Filename:', decodedOriginalFileName);

    const filePath = join('./undefined/handbookfile', encodedFileName);
    const file = createReadStream(filePath);

    file.on('error', (err) => {
      console.error('Error:', err);
      return res.status(404).send('File not found');
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileoriginalName.replace(/[^\x00-\x7F]/g, '_')}"; filename*=UTF-8''${encodedFileName}`,
    });

    file.pipe(res);
  }



  @Get('ma-car-wrapup-image/:maName')
  getmaCarWrapupImage(
    @Param('maName') maName: string,
    @Res() res: Response,
  ): void {
    console.log(maName);
    // const filesPath =  join(`./undefined/handbookfile`,filename);
    const file = createReadStream(join(`./undefined/maCarImage`, maName));
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `inline; fileName="${file}"`,
    });
    file.pipe(res);
  }
}
