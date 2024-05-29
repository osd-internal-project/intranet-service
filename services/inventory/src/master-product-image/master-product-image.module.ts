import { Module } from '@nestjs/common';
import { MasterProductImageService } from './master-product-image.service';
import { MasterProductImageController } from './master-product-image.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProductImageController],
  providers: [MasterProductImageService],
})
export class MasterProductImageModule {}
