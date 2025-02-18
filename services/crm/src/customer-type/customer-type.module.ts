import { Module } from '@nestjs/common';
import { CustomerTypeService } from './customer-type.service';
import { CustomerTypeController } from './customer-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerTypeController],
  providers: [CustomerTypeService],
})
export class CustomerTypeModule {}
