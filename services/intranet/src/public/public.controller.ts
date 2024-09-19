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

  @Get('/handbook-file/:fileId')
  getHandbookFile(
    @Param('fileId') fileId: string,
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ): void {
    

    // ระบุตำแหน่งไฟล์
    const filePath = join('./undefined/handbookfile', fileId);
    const file = createReadStream(filePath);
const fileNewName =decodeURIComponent(fileName) 
    console.log(fileNewName,filePath)
    file.on('error', (err) => {
      console.error('Error:', err);
      return res.status(404).send('File not found');
    });

    // ตั้งค่า Content-Disposition ให้รองรับชื่อไฟล์ภาษาไทย
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="export.pdf"`,
    });
    // ส่งไฟล์กลับไปยังผู้ใช้
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
