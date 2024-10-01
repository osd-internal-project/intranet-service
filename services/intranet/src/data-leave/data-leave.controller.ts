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
import { DataLeaveService } from './data-leave.service';
import { Prisma } from '@prisma/client';

@Controller('data-leave')
export class DataLeaveController {
  constructor(private readonly dataLeaveService: DataLeaveService) {}

  @Post()
  create(@Body('condition') condition: Prisma.dataLeaveCreateArgs) {
    return this.dataLeaveService.create(condition);
  }

  @Post('condition')
  findMany(@Body('condition') condition: Prisma.dataLeaveFindManyArgs) {
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

  @Get(`find-detail-type-leave-by-userId/:userId`)
  findDetailTypeLeaveByUserId(@Param('userId') userId: string) {
    return this.dataLeaveService.findDetailTypeLeaveByUserId(userId);
  }

  @Get(`find-user-by-userId/:userId`)
  findUserByUserId(@Param('userId') userId: string) {
    return this.dataLeaveService.findUserByUserId(userId);
  }

  @Get('leave-header/:userId')
  findLeaveByUserId(@Param('userId') userId: string) {
    return this.dataLeaveService.findLeaveByUserId(userId);
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
