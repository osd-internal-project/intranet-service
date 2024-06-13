import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataLeaveService } from './data-leave.service';
import { CreateDataLeaveDto } from './dto/create-data-leave.dto';
import { UpdateDataLeaveDto } from './dto/update-data-leave.dto';
import { Prisma } from '@prisma/client';

@Controller('data-leave')
export class DataLeaveController {
  constructor(private readonly dataLeaveService: DataLeaveService) {}

  @Post()
  create(@Body() createDataLeaveDto: Prisma.dataLeaveCreateArgs) {
    return this.dataLeaveService.create(createDataLeaveDto);
  }

  @Post()
  findMany(@Body('condition') condition: Prisma.dataLeaveFindFirstArgs) {
    return this.dataLeaveService.findMany(condition);
  }

  @Get()
  findAll() {
    return this.dataLeaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataLeaveService.findOne(+id);
  }

  @Patch(':id')
  update(@Body('condition') condition: Prisma.dataLeaveUpdateArgs) {
    return this.dataLeaveService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLeaveService.remove(+id);
  }
}
