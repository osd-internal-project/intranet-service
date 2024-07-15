import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MaCarService } from './ma-car.service';
import { CreateMaCarDto } from './dto/create-ma-car.dto';
import { UpdateMaCarDto } from './dto/update-ma-car.dto';

@Controller('ma-car')
export class MaCarController {
  constructor(private readonly maCarService: MaCarService) {}

  @Post()
  create(@Body() data: Prisma.maCarCreateInput) {
    return this.maCarService.create(data);
  }

  @Get()
  findAll() {
    console.log('test');
    
    return this.maCarService.findAll();
  }

  @Get(':carId')
  findOne(@Param('carId') carId: string) {
    return this.maCarService.findOne(carId);
  }

  @Patch(':carId')
  update(@Param('carId') carId: string, @Body() data: Prisma.maCarUpdateInput) {
    return this.maCarService.update(carId, data);
  }

  @Delete(':carId')
  remove(@Param('carId') carId: string) {
    return this.maCarService.remove(carId);
  }
}
