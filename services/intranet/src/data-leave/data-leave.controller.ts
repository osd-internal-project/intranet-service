import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { DataLeaveService } from './data-leave.service';
import { Prisma } from '@prisma/client';
import { UserInterceptor } from '@inventory/share';

@Controller('data-leave')
export class DataLeaveController {
  constructor(private readonly dataLeaveService: DataLeaveService) {}

  @Post()
  create(@Body('condition') condition: Prisma.dataLeaveCreateArgs) {
    return this.dataLeaveService.create(condition);
  }

  @Get()
  findAll() {
    return this.dataLeaveService.findAll();
  }

  @Get('condition')
  findFirstByCondition(@Query() params: any) {
    return this.dataLeaveService.findManyByCondition(params);
  }

  @Get('leave-header')
  @UseInterceptors(UserInterceptor)
  findLeaveByUserId(@Req() req) {
    return this.dataLeaveService.findHeaderId(req.body.sub);
  }

  @Get('findGroup/:userId')
  findGroup(@Param('userId') userId: string) {
    return this.dataLeaveService.findGroup(userId);
  }

  @Get(':userId')
  findMany(@Param('userId') userId: string) {
    return this.dataLeaveService.findMany(userId);
  }

  @Get('/:id')
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

  @Patch(':id')
  update(@Body('condition') condition: Prisma.dataLeaveUpdateArgs) {
    return this.dataLeaveService.update(condition);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataLeaveService.remove(+id);
  }
}
