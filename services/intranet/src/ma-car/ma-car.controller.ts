import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaCarService } from './ma-car.service';
import { CreateMaCarDto } from './dto/create-ma-car.dto';
import { UpdateMaCarDto } from './dto/update-ma-car.dto';

@Controller('ma-car')
export class MaCarController {
  constructor(private readonly maCarService: MaCarService) {}

  @Post()
  create(@Body() createMaCarDto: CreateMaCarDto) {
    return this.maCarService.create(createMaCarDto);
  }

  @Get()
  findAll() {
    return this.maCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maCarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaCarDto: UpdateMaCarDto) {
    return this.maCarService.update(+id, updateMaCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maCarService.remove(+id);
  }
}
