import { Module } from '@nestjs/common';
import { UserPermissionGroupService } from './user-permission-group.service';
import { UserPermissionGroupController } from './user-permission-group.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserPermissionGroupController],
  providers: [UserPermissionGroupService],
})
export class UserPermissionGroupModule {}
