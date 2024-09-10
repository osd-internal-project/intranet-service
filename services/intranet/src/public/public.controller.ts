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
  @Controller('public')
  export class PublicController { 
    @Get('news-image/:filename')
    getNewsImageFile(@Param('filename') filename:string, @Res() res: Response): void {
        // const filesPath =  join(`./undefined/newsimage`,filename);
      const file = createReadStream(join(`./undefined/newsimage`,filename));
      res.set({
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; filename="${file}"`, 
      });
        file.pipe(res);
    }

    @Get('handbook-file/:filename')
    gethandbookfile(@Param('filename') fileName:string, @Res() res: Response): void {
      console.log(fileName)
        // const filesPath =  join(`./undefined/handbookfile`,filename);
      const file = createReadStream(join(`./undefined/handbookfile`,fileName));
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; fileName="${fileName}"`, 
      });
        file.pipe(res);
    }

    @Get('ma-car-wrapup-image/:maName')
    getmaCarWrapupImage(@Param('maName') maName:string, @Res() res: Response): void {
      console.log(maName)
        // const filesPath =  join(`./undefined/handbookfile`,filename);
      const file = createReadStream(join(`./undefined/maCarImage`,maName));
      res.set({
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `inline; fileName="${file}"`, 
      });
        file.pipe(res);
    }
  }
  