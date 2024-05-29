import { Module } from '@nestjs/common';
import { MasterProductTypeService } from './master-product-type.service';
import { MasterProductTypeController } from './master-product-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProductTypeController],
  providers: [MasterProductTypeService],
})
export class MasterProductTypeModule {}
