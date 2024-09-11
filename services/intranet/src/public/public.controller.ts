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
  @Query('fileimageName') fileimageName: string, // ใช้ @Query ในการรับค่า fileimageName
  @Res() res: Response,
): void {
  console.log(fileName);
  const filePath = join(`./undefined/handbookfile`, fileName); // ตรวจสอบ path ของไฟล์ให้ถูกต้อง
  const file = createReadStream(filePath);

  // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
  file.on('error', (err) => {
    console.error(err);
    res.status(404).send('File not found');
  });

  // ตั้งค่า Content-Disposition โดยใช้ชื่อ fileimageName แทนที่ fileName ในการดาวน์โหลด
  res.set({
    'Content-Type': 'application/pdf', // ประเภทไฟล์อาจจะต้องเปลี่ยนตามประเภทของไฟล์ที่ใช้
    'Content-Disposition': `attachment; fileName="${fileimageName || fileName}"`, // ใช้ fileimageName ถ้ามี ไม่เช่นนั้นใช้ fileName
  });

  file.pipe(res); // ส่งไฟล์ไปยัง response
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
