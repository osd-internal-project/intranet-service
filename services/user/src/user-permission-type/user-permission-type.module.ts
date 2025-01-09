import { Module } from '@nestjs/common';
import { UserPermissionTypeService } from './user-permission-type.service';
import { UserPermissionTypeController } from './user-permission-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserPermissionTypeController],
  providers: [UserPermissionTypeService],
})
export class UserPermissionTypeModule {}
