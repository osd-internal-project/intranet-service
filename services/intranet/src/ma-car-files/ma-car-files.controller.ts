import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaCarFilesService } from './ma-car-files.service';
import { CreateMaCarFileDto } from './dto/create-ma-car-file.dto';
import { UpdateMaCarFileDto } from './dto/update-ma-car-file.dto';
import { Prisma } from '@prisma/client';

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
