import { Module } from '@nestjs/common';
import { CustomerProjectService } from './customer-project.service';
import { CustomerProjectController } from './customer-project.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerProjectController],
  providers: [CustomerProjectService],
})
export class CustomerProjectModule {}
