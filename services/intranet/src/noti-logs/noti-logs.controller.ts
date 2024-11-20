import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotiLogsService } from './noti-logs.service';
import { Prisma } from '@prisma/client';

@Controller('noti-logs')
export class NotiLogsController {
  constructor(private readonly notiLogsService: NotiLogsService) {}

  @Post()
  create(@Body() createNotiLogDto: Prisma.notiActionLogsCreateInput) {
    return this.notiLogsService.create(createNotiLogDto);
  }

  @Get()
  findAll() {
    return this.notiLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notiLogsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.notiActionLogsUpdateInput,
  ) {
    return this.notiLogsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notiLogsService.remove(+id);
  }
}
