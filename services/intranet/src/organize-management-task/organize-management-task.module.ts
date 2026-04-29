import { Module } from '@nestjs/common';
import { organizeManagementTaskService } from './organize-management-task.service';
import { OrganizeManagementTaskController } from './organize-management-task.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [OrganizeManagementTaskController],
  providers: [organizeManagementTaskService],
})
export class OrganizeManagementTaskModule {}
