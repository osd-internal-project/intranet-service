import { Module } from '@nestjs/common';
import { MaCarBookingImagesService } from './ma-car-booking-images.service';
import { MaCarBookingImagesController } from './ma-car-booking-images.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MaCarBookingImagesController],
  providers: [MaCarBookingImagesService],
})
export class MaCarBookingImagesModule {}
