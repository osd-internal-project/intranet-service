import { Module } from '@nestjs/common';
import { MasterProductService } from './master-product.service';
import { MasterProductController } from './master-product.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterProductController],
  providers: [MasterProductService],
})
export class MasterProductModule {}
