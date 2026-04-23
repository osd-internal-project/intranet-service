import { Module } from '@nestjs/common';
import { OrganizeManagementService } from './organize-management.service';
import { OrganizeManagementController } from './organize-management.controller';

@Module({
  controllers: [OrganizeManagementController],
  providers: [OrganizeManagementService]
})
export class OrganizeManagementModule {}
