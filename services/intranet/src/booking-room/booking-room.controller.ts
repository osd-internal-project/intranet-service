import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  Query,
} from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { Prisma } from '@prisma/client';
import { UserInterceptor } from '@inventory/share';
import * as dayjs from 'dayjs';

@Controller('booking-room')
export class BookingRoomController {
  constructor(private readonly bookingRoomService: BookingRoomService) {}

  @Post()
  create(@Body() data: Prisma.bookingRoomCreateInput) {
    return this.bookingRoomService.create(data);
  }

  @Get()
  @UseInterceptors(UserInterceptor)
  findAll(
    @Req() req,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('role') role?: string,
  ) {
    if (role === 'admin' || skip === undefined || take === undefined) {
      return this.bookingRoomService.findAll(req.body.sub);
    }
    return this.bookingRoomService.findMany(+skip, +take, req.body.sub, role);
  }

  @Get('calendar')
  @UseInterceptors(UserInterceptor)
  findCalendar(@Req() req, @Query() query: { month: Date | string }) {
    const token = req.body.sub;
    return this.bookingRoomService.findCalendar(token, query);
  }

  @Get('count-by-room-and-range')
  countBookingRoomCountByRoomAndRange(
    @Query('roomId') roomId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.bookingRoomService.countBookingRoomCountByRoomAndRange(
      roomId,
      startDate,
      endDate,
    );
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
