import { Module } from '@nestjs/common';
import { OrganizeTaskService } from './organize-task.service';
import { OrganizeTaskController } from './organize-task.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [OrganizeTaskController],
  providers: [OrganizeTaskService],
})
export class OrganizeTaskModule {}
