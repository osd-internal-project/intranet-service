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
import { emailTemplateService } from './emailTemplate.service';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
@Controller('emailTemplate')
export class emailTemplateController {
  constructor(
    private readonly emailTemplateService: emailTemplateService,
  ) {}

  @Post()
  create(@Body() data: Prisma.emailTemplateCreateArgs) {
    return this.emailTemplateService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.emailTemplateService.findAll(query);
  }
  @Get("home/news")
  findNewsAll(@Query() query) {
    return this.emailTemplateService.findNewsAll(query);
  }

  

  @Get(':newsId')
  findOne(@Param('newsId') newsId: number) {
    return this.emailTemplateService.findOne(+newsId);
  }

  @Patch(':newsId')
  update(
    @Param('newsId') newsId: number,
    @Body() condition: Prisma.emailTemplateUpdateArgs,
  ) {
    return this.emailTemplateService.update(+newsId, condition);
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: number) {
    return this.emailTemplateService.remove(+newsId);
  }
}
