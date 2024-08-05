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
import { NewsImageService } from './newsImage.service';
import { Prisma } from '@prisma/client';

@Controller('news-Image')
export class NewsImageController {
  constructor(private readonly newsImageService: NewsImageService) {}

  @Post()
  create(@Body() data: Prisma.newsImageCreateArgs) {
    return this.newsImageService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.newsImageService.findAll(query);
  }

  @Get(':imageId')
  findOne(@Param('imageId') imageId: string) {
    return this.newsImageService.findOne(+imageId);
  }

  @Patch(':imageId')
  update(
    @Param('imageId') imageId: string,
    @Body() condition: Prisma.newsImageUpdateArgs,
  ) {
    
    return this.newsImageService.update(imageId, condition);
  }

  @Delete(':imageId')
  remove(@Param('imageId') imageId: string) {
    return this.newsImageService.remove(+imageId);
  }
}
