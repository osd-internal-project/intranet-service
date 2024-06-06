import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { Prisma } from '@prisma/client';

@Controller('booking-room')
export class BookingRoomController {
  constructor(private readonly bookingRoomService: BookingRoomService) {}

  @Post()
  create(@Body() data: Prisma.bookingRoomCreateInput) {
    return this.bookingRoomService.create(data);
  }

  @Get()
  findAll() {
    return this.bookingRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.masterRoomUpdateInput) {
    return this.bookingRoomService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingRoomService.remove(+id);
  }
}
