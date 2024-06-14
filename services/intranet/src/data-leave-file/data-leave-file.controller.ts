import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataLeaveFileService } from './data-leave-file.service';
import { Prisma } from '@prisma/client';

@Controller('data-leave-file')
export class DataLeaveFileController {
  constructor(private readonly dataLeaveFileService: DataLeaveFileService) {}

  @Post()
  create(@Body('condition') condition: Prisma.dataLeaveFilesCreateArgs) {
    return this.dataLeaveFileService.create(condition);
  }

  @Get()
  findAll() {
    return this.dataLeaveFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataLeaveFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Body('condition')
    condition: Prisma.dataLeaveFilesUpdateArgs,
  ) {
    return this.dataLeaveFileService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLeaveFileService.remove(+id);
  }
}
