import { Module } from '@nestjs/common';
import { MaCarBookingImagesService } from './ma-car-booking-images.service';
import { MaCarBookingImagesController } from './ma-car-booking-images.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [MaCarBookingImagesController],
  providers: [MaCarBookingImagesService],
})
export class MaCarBookingImagesModule {}
