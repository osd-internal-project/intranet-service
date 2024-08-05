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
import { informationNewsService } from './informationNew.service';
import { Prisma } from '@prisma/client';

@Controller('information-news')
export class InformationController {
  constructor(private readonly informationNewsService: informationNewsService) {}

  @Post()
  create(@Body() data: Prisma.informationNewsCreateArgs) {
    return this.informationNewsService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.informationNewsService.findAll(query);
  }

  @Get(':newsId')
  findOne(@Param('newsId') newsId: string) {
    return this.informationNewsService.findOne(+newsId);
  }

  @Patch(':newsId')
  update(
    @Param('newsId') newsId: string,
    @Body() condition: Prisma.informationNewsUpdateArgs,
  ) {
    
    return this.informationNewsService.update(newsId, condition);
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: string) {
    return this.informationNewsService.remove(+newsId);
  }
}
