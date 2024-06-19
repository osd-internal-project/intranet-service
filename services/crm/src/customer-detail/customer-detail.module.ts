import { Module } from '@nestjs/common';
import { CustomerDetailService } from './customer-detail.service';
import { CustomerDetailController } from './customer-detail.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerDetailController],
  providers: [CustomerDetailService],
})
export class CustomerDetailModule {}
