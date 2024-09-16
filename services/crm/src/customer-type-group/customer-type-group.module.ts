import { Module } from '@nestjs/common';
import { CustomerTypeGroupService } from './customer-type-group.service';
import { CustomerTypeGroupController } from './customer-type-group.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerTypeGroupController],
  providers: [CustomerTypeGroupService],
})
export class CustomerTypeGroupModule {}
