import { Module } from '@nestjs/common';
import { MasterProductGroupService } from './master-product-group.service';
import { MasterProductGroupController } from './master-product-group.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProductGroupController],
  providers: [MasterProductGroupService],
})
export class MasterProductGroupModule {}
