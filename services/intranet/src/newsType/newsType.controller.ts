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
import { newsTypeService } from './newsType.service';
import { Prisma } from '@prisma/client';

@Controller('newsType')
export class newsTypeController {
  constructor(private readonly newsTypeService: newsTypeService) {}

  @Post()
  create(@Body() data: Prisma.newsTypeCreateArgs) {
    return this.newsTypeService.create(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.newsTypeService.findAll(query);
  }

  @Get(':idType')
  findOne(@Param('idType') idType: string) {
    return this.newsTypeService.findOne(+idType);
  }

  @Patch(':idType')
  update(
    @Param('idType') idType: string,
    @Body() condition: Prisma.newsTypeUpdateArgs,
  ) {
    
    return this.newsTypeService.update(+idType, condition);
  }

  @Delete(':idType')
  remove(@Param('idType') idType: string) {
    return this.newsTypeService.remove(+idType);
  }
}
