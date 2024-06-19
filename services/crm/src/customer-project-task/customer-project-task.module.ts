import { Module } from '@nestjs/common';
import { CustomerProjectTaskService } from './customer-project-task.service';
import { CustomerProjectTaskController } from './customer-project-task.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [CustomerProjectTaskController],
  providers: [CustomerProjectTaskService],
})
export class CustomerProjectTaskModule {}
