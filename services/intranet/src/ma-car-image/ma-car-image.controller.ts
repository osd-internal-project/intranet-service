import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MaCarImageService, MaCarImageType } from './ma-car-image.service';

@Controller('ma-car-image')
export class MaCarImageController {
  constructor(private readonly maCarImageService: MaCarImageService) {}

  @Get('car/:carId')
  findByCar(@Param('carId') carId: string) {
    return this.maCarImageService.findByCar(carId);
  }

  /** อัปโหลดรูปรถขึ้น MinIO — type=profile แทนที่รูปเดิม, type=gallery เพิ่มต่อท้าย */
  @Post(':carId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  upload(
    @Param('carId') carId: string,
    @Query('type') type: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (type !== 'profile' && type !== 'gallery') {
      throw new BadRequestException('type must be profile or gallery');
    }
    if (!files?.length) {
      throw new BadRequestException('files is required');
    }
    if (type === 'profile' && files.length > 1) {
      throw new BadRequestException('profile accepts only 1 image');
    }
    if (files.some((file) => !file.mimetype.startsWith('image/'))) {
      throw new BadRequestException('only image files are allowed');
    }
    return this.maCarImageService.upload(carId, type as MaCarImageType, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarImageService.remove(+id);
  }
}
