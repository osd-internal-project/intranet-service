import { Module } from '@nestjs/common';
import { OrganizeTaskService } from './organize-task.service';
import { OrganizeTaskController } from './organize-task.controller';

@Module({
  controllers: [OrganizeTaskController],
  providers: [OrganizeTaskService]
})
export class OrganizeTaskModule {}
