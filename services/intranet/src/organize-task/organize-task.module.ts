import { Module } from '@nestjs/common';
import { OrganizeTaskService } from './organize-task.service';
import { OrganizeTaskController } from './organize-task.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizeTaskController],
  providers: [OrganizeTaskService],
})
export class OrganizeTaskModule {}
