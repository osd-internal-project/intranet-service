import { Module } from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { BookingRoomController } from './booking-room.controller';
import { PrismaModule } from '@inventory/share';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [BookingRoomController],
  providers: [BookingRoomService, JwtService],
})
export class BookingRoomModule {}
