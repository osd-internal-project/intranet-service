import { Module } from '@nestjs/common';
import { CustomerDetailSubService } from './customer-detail-sub.service';
import { CustomerDetailSubController } from './customer-detail-sub.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerDetailSubController],
  providers: [CustomerDetailSubService],
})
export class CustomerDetailSubModule {}
