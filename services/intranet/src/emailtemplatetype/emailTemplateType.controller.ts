import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { emailTemplateTypeService } from './emailTemplateType.service';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
@Controller('emailTemplateType')
export class emailTemplateTypeController {
  constructor(
    private readonly emailTemplateTypeService: emailTemplateTypeService,
  ) {}

  @Post()
  create(@Body() data: Prisma.emailTemplateTypeCreateArgs) {
    return this.emailTemplateTypeService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.emailTemplateTypeService.findAll(query);
  }
  @Get("home/news")
  findNewsAll(@Query() query) {
    return this.emailTemplateTypeService.findNewsAll(query);
  }

  

  @Get(':newsId')
  findOne(@Param('newsId') newsId: number) {
    return this.emailTemplateTypeService.findOne(+newsId);
  }

  @Patch(':newsId')
  update(
    @Param('newsId') newsId: number,
    @Body() condition: Prisma.emailTemplateTypeUpdateArgs,
  ) {
    return this.emailTemplateTypeService.update(+newsId, condition);
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: number) {
    return this.emailTemplateTypeService.remove(+newsId);
  }
}
