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
import { CreateMaCarBookDto } from './dto/create-ma-car-book.dto';
import { UpdateMaCarBookDto } from './dto/update-ma-car-book.dto';
import { Prisma } from '@prisma/client';

@Controller('ma-car-book')
export class MaCarBookController {
  constructor(private readonly maCarBookService: MaCarBookService) {}

  @Post()
  create(@Body() data: Prisma.maCarBookCreateInput) {
    return this.maCarBookService.create(data);
  }

  @Get()
  findAll() {
    return this.maCarBookService.findAll();
  }

  @Get(':carId')
  findOne(@Param('carId') carId: string) {
    return this.maCarBookService.findOne(carId);
  }

  @Patch(':carId')
  update(
    @Param('carId') carId: string,
    @Body() data: Prisma.maCarBookUpdateInput,
  ) {
    return this.maCarBookService.update(carId, data);
  }

  @Delete(':carId')
  remove(@Param('carId') carId: string) {
    return this.maCarBookService.remove(carId);
  }
}
