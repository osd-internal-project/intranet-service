import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaCarBookService } from './ma-car-book.service';
import { Prisma } from '@prisma/client';

@Controller('ma-car-book')
export class MaCarBookController {
  constructor(private readonly maCarBookService: MaCarBookService) {}

  @Post()
  create(@Body() data: Prisma.maCarBookCreateInput) {
    return this.maCarBookService.create(data);
  }

  @Get()
  findMany() {
    return this.maCarBookService.findMany();
  }

  @Get(':createdById')
  createdById(@Param('createdById') createdById: string) {
    return this.maCarBookService.createdById(createdById);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.maCarBookUpdateInput) {
    return this.maCarBookService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarBookService.remove(+id);
  }
}
