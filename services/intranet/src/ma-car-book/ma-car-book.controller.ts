import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaCarBookService } from './ma-car-book.service';
import { CreateMaCarBookDto } from './dto/create-ma-car-book.dto';
import { UpdateMaCarBookDto } from './dto/update-ma-car-book.dto';

@Controller('ma-car-book')
export class MaCarBookController {
  constructor(private readonly maCarBookService: MaCarBookService) {}

  @Post()
  create(@Body() createMaCarBookDto: CreateMaCarBookDto) {
    return this.maCarBookService.create(createMaCarBookDto);
  }

  @Get()
  findAll() {
    return this.maCarBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maCarBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaCarBookDto: UpdateMaCarBookDto) {
    return this.maCarBookService.update(+id, updateMaCarBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarBookService.remove(+id);
  }
}
