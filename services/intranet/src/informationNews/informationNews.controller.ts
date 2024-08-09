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
import { informationNewsService } from './informationNews.service';
import { Prisma } from '@prisma/client';

@Controller('informationNews')
export class InformationController {
  constructor(private readonly informationNewsService: informationNewsService) {}

  @Post()
  create(@Body() data: Prisma.informationNewsCreateArgs) {
    console.log(data);
    return this.informationNewsService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.informationNewsService.findAll(query);
  }

  @Get(':newsId')
  findOne(@Param('newsId') newsId: number) {
    return this.informationNewsService.findOne(+newsId);
  }

  @Patch(':newsId')
  update(
    @Param('newsId') newsId: number,
    @Body() condition: Prisma.informationNewsUpdateArgs,
  ) {
    
    return this.informationNewsService.update(+newsId, condition);
  }

  @Delete(':newsId')
  remove(@Param('newsId') newsId: number) {
    return this.informationNewsService.remove(+newsId);
  }
}
