import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MasterRoomService } from './master-room.service';
import { Prisma } from '@prisma/client';

@Controller('master-room')
export class MasterRoomController {
  constructor(private readonly masterRoomService: MasterRoomService) {}

  @Post()
  create(@Body() data: Prisma.masterRoomCreateInput) {
    console.log(data)
    return this.masterRoomService.create(data);
  }

  @Get()
  findAll() {
    return this.masterRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.masterRoomUpdateInput) {
    return this.masterRoomService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterRoomService.remove(+id);
  }
}
