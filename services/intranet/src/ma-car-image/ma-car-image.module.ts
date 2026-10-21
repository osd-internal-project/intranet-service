import { Module } from '@nestjs/common';
import { MaCarImageService } from './ma-car-image.service';
import { MaCarImageController } from './ma-car-image.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [MaCarImageController],
  providers: [MaCarImageService],
})
export class MaCarImageModule {}
