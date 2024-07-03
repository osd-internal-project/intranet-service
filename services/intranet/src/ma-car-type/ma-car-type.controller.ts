import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaCarTypeService } from './ma-car-type.service';
import { CreateMaCarTypeDto } from './dto/create-ma-car-type.dto';
import { UpdateMaCarTypeDto } from './dto/update-ma-car-type.dto';

@Controller('ma-car-type')
export class MaCarTypeController {
  constructor(private readonly maCarTypeService: MaCarTypeService) {}

  @Post()
  create(@Body() createMaCarTypeDto: CreateMaCarTypeDto) {
    return this.maCarTypeService.create(createMaCarTypeDto);
  }

  @Get()
  findAll() {
    return this.maCarTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maCarTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaCarTypeDto: UpdateMaCarTypeDto) {
    return this.maCarTypeService.update(+id, updateMaCarTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarTypeService.remove(+id);
  }
}
