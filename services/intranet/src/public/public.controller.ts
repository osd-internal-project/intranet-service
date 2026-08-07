import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { extname, isAbsolute, join } from 'path';
import { createReadStream } from 'fs';

import { MinioClientService } from 'src/minio-client/minio-client.service';
import { Response } from 'express';
import configs from 'src/configs';

const PORT = configs();

/** Content-Type ตามนามสกุลไฟล์ — ใช้แสดง thumbnail/preview ให้ถูกชนิด */
const MIME_BY_EXT: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

/**
 * สร้างค่า Content-Disposition สำหรับดาวน์โหลดที่รองรับชื่อไฟล์ภาษาไทย
 * ตาม RFC 6266: พารามิเตอร์ filename= รับได้เฉพาะ ascii จึงต้องส่งชื่อ utf8
 * ผ่าน filename* (RFC 5987) ควบคู่กัน — เบราว์เซอร์จะเลือกใช้ filename* ก่อน
 * @param downloadName ชื่อไฟล์ที่ต้องการให้ผู้ใช้ได้รับ (utf8)
 * @returns ค่า header เช่น: attachment; filename="___.pdf"; filename*=UTF-8''%E0%B8%97.pdf
 */
const buildAttachmentDisposition = (downloadName: string): string => {
  // แทนอักขระที่ไม่ใช่ ascii printable และตัวที่ทำให้ quoted-string พัง (" กับ \)
  const asciiFallback = downloadName
    .replace(/[^\x20-\x7e]/g, '_')
    .replace(/["\\]/g, '_');
  // encodeURIComponent ไม่ encode ' ( ) * ! ซึ่งไม่ใช่ attr-char ตาม RFC 5987 จึงต้อง encode เพิ่มเอง
  const encoded = encodeURIComponent(downloadName).replace(
    /['()*!]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
};

@Controller('public')
export class PublicController {
  constructor(private readonly minioService: MinioClientService) {}

  /**
   * สตรีมไฟล์ของโมดูล macar จาก MinIO ด้วย object key
   * - mode=inline (default) สำหรับ thumbnail/preview, mode=attachment สำหรับดาวน์โหลด
   * - ดาวน์โหลดใช้ชื่อไฟล์เดิม (name) แม้ object จริงจะเป็น uuid
   * @param key object key ใน bucket (เช่น macar/car/{carId}/ma/{uuid}.jpg)
   * @param name ชื่อไฟล์เดิมสำหรับตั้งชื่อตอนดาวน์โหลด
   * @param mode inline | attachment
   */
  @Get('macar-file')
  async getMacarFile(
    @Query('key') key: string,
    @Query('name') name: string,
    @Query('mode') mode: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!key) {
      res.status(404).send('File not found');
      return;
    }
    const contentType =
      MIME_BY_EXT[extname(key).toLowerCase()] ?? 'application/octet-stream';
    // express decode query string ให้แล้ว — decodeURIComponent ซ้ำจะพังกับชื่อที่มี %
    // (เช่น "ส่วนลด100%.pdf" จะ throw URIError ทำให้ request 500)
    const downloadName = name || key.split('/').pop();
    const disposition =
      mode === 'attachment'
        ? buildAttachmentDisposition(downloadName)
        : 'inline';
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentType,
      'Content-Disposition': disposition,
    });

    // ไฟล์เก่า (ก่อนย้ายมา MinIO) เก็บ filePath เป็น path บนดิสก์ ไม่ได้ขึ้นต้นด้วย macar/
    // จึงอ่านจากดิสก์แทน เพื่อให้ไฟล์เดิมยังเปิดได้
    if (!key.startsWith('macar/')) {
      const diskPath = isAbsolute(key) ? key : join(process.cwd(), key);
      const file = createReadStream(diskPath);
      file.on('error', () => {
        if (!res.headersSent) res.status(404).send('File not found');
      });
      file.pipe(res);
      return;
    }

    try {
      const stream = await this.minioService.downloadFile(
        configs().minioBucket,
        key,
      );
      stream.on('error', () => {
        if (!res.headersSent) res.status(404).send('File not found');
      });
      stream.pipe(res);
    } catch {
      if (!res.headersSent) res.status(404).send('File not found');
    }
  }
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

  @Get('/car-file/:fileId')
  getCarFile(
    @Param('fileId') fileId: string,
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ): void {
    const filePath = join(`${PORT.pathMountDirUpload}/maCarFiles`, fileId);
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

  /**
   * ไฟล์แนบของเอกสารรถ (ประกัน/พรบ./ภาษี)
   * ต่างจาก /car-file ตรงที่หา Content-Type จากนามสกุลไฟล์จริง ไม่ fix เป็น application/pdf
   * เพราะผู้ใช้แนบรูปถ่ายป้ายภาษี/สลิป พรบ. เป็น .jpg/.png ได้ ไม่ใช่ PDF อย่างเดียว
   */
  @Get('/car-document-file/:fileId')
  getCarDocumentFile(
    @Param('fileId') fileId: string,
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ): void {
    const filePath = join(
      `${PORT.pathMountDirUpload}/maCarDocumentFiles`,
      fileId,
    );
    const file = createReadStream(filePath);
    file.on('error', (err) => {
      console.error('Error:', err);
      return res.status(404).send('File not found');
    });

    const mimeTypes: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
    };
    const contentType =
      mimeTypes[extname(fileId).toLowerCase()] ?? 'application/octet-stream';

    // ถ้าไม่ส่ง fileName มา ใช้ชื่อไฟล์บน disk แทน จะได้ไม่ตั้งชื่อเป็น "undefined"
    const downloadName = fileName || fileId;

    res.set({
      'Content-Type': contentType,
      'Content-Disposition': buildAttachmentDisposition(downloadName),
    });
    file.pipe(res);
  }

  @Get('/get-image-user/:imageId')
  getUserImages(@Param('fileId') fileId: string, @Res() res: Response): void {
    const filePath = join(`${PORT.pathMountDirUpload}/handbookfile`, fileId);
    if (!filePath) {
      const base64Data =
        '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';
      const imgBuffer = Buffer.from(base64Data, 'base64');
      res.set('Content-Type', 'image/png');
      res.send(imgBuffer);
    }
    const imagePath = filePath;
    return res.sendFile(imagePath, { root: './' });
  }

  @Get('ma-car-wrapup-image/:maName')
  getmaCarWrapupImage(
    @Param('maName') maName: string,
    @Res() res: Response,
  ): void {
    const file = createReadStream(
      join(`${PORT.pathMountDirUpload}/maCarImage`, maName),
    );
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `inline; fileName="${file}"`,
    });
    file.pipe(res);
  }
  // @Get('image-minio/:name')
  // async getPublicImage(@Param('name') name: string, @Res() res: Response) {
  //   try {
  //     const decodedName = decodeURIComponent(name);
  //     const bucket = minioBucket;

  //     // เช็คว่าไฟล์มีจริง
  //     const stat = await this.minioService.statFile(bucket, decodedName);
  //     if (!stat) return res.status(404).send('File not found');

  //     // โหลดไฟล์จาก MinIO
  //     const stream = await this.minioService.downloadFile(bucket, decodedName);

  //     stream.on('error', (err) => {
  //       console.error('MinIO Stream Error:', err);
  //       if (!res.headersSent) res.status(500).send('Error reading file');
  //     });

  //     res.set({
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': stat.contentType || 'application/octet-stream',
  //       'Content-Disposition': 'inline',
  //     });

  //     return stream.pipe(res);
  //   } catch (err) {
  //     console.error('Public Controller Error:', err);
  //     if (!res.headersSent)
  //       return res.status(500).send('Internal Server Error');
  //   }
  // }
  // @Get('minio-url')
  // async getPresignedUrl(
  //   @Query('bucket') bucket: string,
  //   @Query('filename') filename: string,
  // ): Promise<string> {
  //   console.log(`Bucket : ${bucket}`);
  //   console.log(`Filename : ${filename}`);
  //   return await this.minioService.getPresignedUrl(bucket, filename);
  // }
}
