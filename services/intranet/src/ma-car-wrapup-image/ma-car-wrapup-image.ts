import { Module } from '@nestjs/common';
import { maCarWrapupImageService } from './ma-car-wrapup-image.service';
import { maCarWrapupImageController } from './ma-car-wrapup-image.module';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [maCarWrapupImageController],
  providers: [maCarWrapupImageService],
})
export class maCarWrapupImageModule {}
