import { Module } from '@nestjs/common';
import { OrganizeManagementService } from './organize-management.service';
import { OrganizeManagementController } from './organize-management.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizeManagementController],
  providers: [OrganizeManagementService],
})
export class OrganizeManagementModule {}
