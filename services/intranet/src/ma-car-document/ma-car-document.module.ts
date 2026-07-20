import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MaCarDocumentService } from './ma-car-document.service';
import { MaCarDocumentController } from './ma-car-document.controller';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [MaCarDocumentController],
  providers: [MaCarDocumentService],
})
export class MaCarDocumentModule {}
