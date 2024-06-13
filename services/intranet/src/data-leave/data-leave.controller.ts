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
import { Prisma } from '@prisma/client';

@Controller('data-leave')
export class DataLeaveController {
  constructor(private readonly dataLeaveService: DataLeaveService) {}

  @Post()
  create(@Body('condition') condition: Prisma.dataLeaveCreateArgs) {
    return this.dataLeaveService.create(condition);
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
