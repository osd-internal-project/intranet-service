import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MaCarFilesService } from './ma-car-files.service';
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  /** อัปโหลดไฟล์แนบของรถขึ้น MinIO — memory storage (ไม่ใช้ diskStorage) */
  @Post(':carId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  async uploadFile(
    @Param('carId') carId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files) {
      throw new Error('File is undefined');
    }
    return this.maCarFilesService.uploadFiles(carId, files);
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
