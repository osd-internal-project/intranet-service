import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { handbookFileService } from './handbookFile.service';
import { Prisma } from '@prisma/client';

@Controller('handbook-file')
export class handbookFileController {
  constructor(private readonly handbookFileService: handbookFileService) {}

  @Post()
  create(@Body() data: Prisma.handbookFileCreateArgs) {
    return this.handbookFileService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.handbookFileService.findAll(query);
  }

  @Get(':newsId')
  findOne(@Param('newsId') newsId: string) {
    return this.handbookFileService.findOne(+newsId);
  }

  @Patch(':newsId')
  update(
    @Param('newsId') newsId: string,
    @Body() condition: Prisma.handbookFileUpdateArgs,
  ) {
    
    return this.handbookFileService.update(newsId, condition);
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: string) {
    return this.handbookFileService.remove(+newsId);
  }
}
