import { Module } from '@nestjs/common';
import { PublicizeSlideImagesService } from './publicize-slide-images.service';
import { PublicizeSlideImagesController } from './publicize-slide-images.controller';

@Module({
  controllers: [PublicizeSlideImagesController],
  providers: [PublicizeSlideImagesService]
})
export class PublicizeSlideImagesModule {}
