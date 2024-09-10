import { Module } from '@nestjs/common';
import { maCarWrapupImageService } from './maCarWrapupImage.service';
import { maCarWrapupImageController } from './maCarWrapupImage.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [maCarWrapupImageController],
  providers: [maCarWrapupImageService],
})
export class maCarWrapupImageModule {}
