import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MaCarFilesService } from './ma-car-files.service';
import { CreateMaCarFileDto } from './dto/create-ma-car-file.dto';
import { UpdateMaCarFileDto } from './dto/update-ma-car-file.dto';
import { Prisma } from '@prisma/client';
import { extname } from 'path'; 
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import configs from 'src/configs';
const config = configs();

@Controller('ma-car-files')
export class MaCarFilesController {
  constructor(private readonly maCarFilesService: MaCarFilesService) { }

  @Post()
  create(@Body() createMaCarFileDto: Prisma.maCarFilesCreateInput) {
    return this.maCarFilesService.create(createMaCarFileDto);
  }

  @Get()
  findAll() {
    return this.maCarFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maCarFilesService.findOne(+id);
  }

  @Post(':carId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${config.pathMountDirUpload}/maCarFiles`,
        filename: (req, file, callback) => {
          const fileType = file.originalname;
          callback(null, `${fileType}`);
        },
      }),
      limits: {
        fileSize: 200 * 1024 * 1024, // ✅ เพิ่ม limit เป็น 200MB
      },
    }),
  )
  uploadFile(
    @Param('carId') carId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is undefined');
    }
    const fileType = extname(file.originalname);
    const fileName = file.filename;
    const data = {
      carId: carId,
      fileName: fileName,
      filePath: file.path,
      fileType: fileType,
    } as Prisma.maCarWrapupImageCreateInput;
    return this.maCarFilesService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaCarFileDto: Prisma.maCarFilesUpdateInput,
  ) {
    return this.maCarFilesService.update(+id, updateMaCarFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarFilesService.remove(+id);
  }
}
