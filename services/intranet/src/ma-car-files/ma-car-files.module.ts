import { Module } from '@nestjs/common';
import { MaCarFilesService } from './ma-car-files.service';
import { MaCarFilesController } from './ma-car-files.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [MaCarFilesController],
  providers: [MaCarFilesService],
})
export class MaCarFilesModule { }
