import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@inventory/share';

@Controller('booking-room')
export class BookingRoomController {
  constructor(private readonly bookingRoomService: BookingRoomService) {}

  @Post()
  create(@Body() data: Prisma.bookingRoomCreateInput) {
    return this.bookingRoomService.create(data);
  }

  // @Get()
  // @UseGuards(AuthGuard)
  // findAll(@Req() req) {
  //   const userId = req.user.userId;
  //   return this.bookingRoomService.findAll(userId);
  // }

  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    if (skip !== undefined && take !== undefined) {
      return this.bookingRoomService.findMany(+skip, +take);
    }
    return this.bookingRoomService.findAll();
  }

  // @Get()
  // findAll() {
  //   return this.bookingRoomService.findAll();
  // }

  // @Get()
  // findMany(@Query('skip') skip: number, @Query('take') take: number) {
  //   return this.bookingRoomService.findMany(+skip, +take);
  // }

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
