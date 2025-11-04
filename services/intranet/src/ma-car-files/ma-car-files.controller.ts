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
  UploadedFiles,
} from '@nestjs/common';
import { MaCarFilesService } from './ma-car-files.service';
import { Prisma } from '@prisma/client';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: `${config.pathMountDirUpload}/maCarFiles`,
        filename: (req, file, callback) => {
          const fileCode = `${uuidv4()}`;
          const fileType = extname(file.originalname);
          callback(null, `${fileCode}${fileType}`);
        },
      }),
      limits: {
        fileSize: 200 * 1024 * 1024, // 200MB limit
      },
    }),
  )
  async uploadFile(
    @Param('carId') carId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files) {
      throw new Error('File is undefined');
    }
    const createData = files.map((file) => ({
      carId: carId,
      fileName: file.filename,
      filePath: file.path,
      fileType: extname(file.originalname),
      name: file.originalname,
    })) as Prisma.maCarFilesCreateInput[];
    const results = await Promise.all(
      createData.map((data) => this.maCarFilesService.create(data)),
    );
    return results;
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
