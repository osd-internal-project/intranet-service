import { Module } from '@nestjs/common';
import { UserMapRoleGroupService } from './user-map-role-group.service';
import { UserMapRoleGroupController } from './user-map-role-group.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserMapRoleGroupController],
  providers: [UserMapRoleGroupService],
  exports: [UserMapRoleGroupService],
})
export class UserMapRoleGroupModule {}
