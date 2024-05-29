import { Module } from '@nestjs/common';
import { ImageLocationService } from './image-location.service';
import { ImageLocationController } from './image-location.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [ImageLocationController],
  providers: [ImageLocationService],
})
export class ImageLocationModule {}
