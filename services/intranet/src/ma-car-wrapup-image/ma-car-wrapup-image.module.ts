import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { maCarWrapupImageService } from './ma-car-wrapup-image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ma-car-wrapup-image')
export class maCarWrapupImageController {
  constructor(
    private readonly maCarWrapupImageService: maCarWrapupImageService,
  ) {}

  /** อัปโหลดรูปตรวจสภาพขึ้น MinIO — memory storage (ไม่ใช้ diskStorage) เพื่อให้ได้ file.buffer/size */
  @Post(':carWrapupId')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  uploadFile(
    @Param('carWrapupId') carWrapupId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.maCarWrapupImageService.uploadImage(carWrapupId, file);
  }

  @Get()
  findAll(@Query('idwarpupImage') idwarpupImage: number) {
    if (idwarpupImage) {
      return this.maCarWrapupImageService.findAll({
        where: { idwarpupImage: +idwarpupImage },
      });
    }
    return this.maCarWrapupImageService.findAll({});
  }

  @Get(':idwarpupImage')
  findOne(@Param('idwarpupImage') idwarpupImage: number) {
    return this.maCarWrapupImageService.findOne(+idwarpupImage);
  }

  @Delete(':idwarpupImage')
  remove(@Param('idwarpupImage') idwarpupImage: number) {
    return this.maCarWrapupImageService.remove(+idwarpupImage);
  }
}
