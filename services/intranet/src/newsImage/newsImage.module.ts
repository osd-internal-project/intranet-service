import { Module } from '@nestjs/common';
import { NewsImageService } from './newsImage.service';
import { NewsImageController } from './newsImage.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [NewsImageController],
  providers: [NewsImageService],
})
export class NewsImageModule {}
