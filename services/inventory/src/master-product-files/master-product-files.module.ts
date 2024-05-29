import { Module } from '@nestjs/common';
import { MasterProductFilesService } from './master-product-files.service';
import { MasterProductFilesController } from './master-product-files.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProductFilesController],
  providers: [MasterProductFilesService],
})
export class MasterProductFilesModule {}
