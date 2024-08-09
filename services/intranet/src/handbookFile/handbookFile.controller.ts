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

@Controller('handbookfile')
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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.handbookFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() condition: Prisma.handbookFileUpdateArgs,
  ) {
    
    return this.handbookFileService.update(+id, condition);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.handbookFileService.remove(+id);
  }
}
