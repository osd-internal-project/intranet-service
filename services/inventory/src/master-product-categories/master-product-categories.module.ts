import { Module } from '@nestjs/common';
import { MasterProductCategoriesService } from './master-product-categories.service';
import { MasterProductCategoriesController } from './master-product-categories.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProductCategoriesController],
  providers: [MasterProductCategoriesService],
})
export class MasterProductCategoriesModule {}
