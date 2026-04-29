import { Module } from '@nestjs/common';
import { OrganizeManagementService } from './organize-management.service';
import { OrganizeManagementController } from './organize-management.controller';
import { PrismaModule } from '@inventory/share';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule],
  controllers: [OrganizeManagementController],
  providers: [OrganizeManagementService],
})
export class OrganizeManagementModule {}
