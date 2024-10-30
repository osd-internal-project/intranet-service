import { Module } from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CustomerGroupController } from './customer-group.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerGroupController],
  providers: [CustomerGroupService],
})
export class CustomerGroupModule {}
