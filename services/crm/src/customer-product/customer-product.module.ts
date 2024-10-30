import { Module } from '@nestjs/common';
import { CustomerProductService } from './customer-product.service';
import { CustomerProductController } from './customer-product.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerProductController],
  providers: [CustomerProductService],
})
export class CustomerProductModule {}
