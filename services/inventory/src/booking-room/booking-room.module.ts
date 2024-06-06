import { Module } from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { BookingRoomController } from './booking-room.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [BookingRoomController],
  providers: [BookingRoomService]
})
export class BookingRoomModule {}
