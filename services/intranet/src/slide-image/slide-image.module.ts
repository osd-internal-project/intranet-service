import { Module } from '@nestjs/common';
import { SlideImageService } from './slide-image.service';
import { SlideImageController } from './slide-image.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [SlideImageController],
  providers: [SlideImageService],
})
export class SlideImageModule {}
