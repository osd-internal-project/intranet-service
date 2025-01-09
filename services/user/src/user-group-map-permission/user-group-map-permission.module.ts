import { Module } from '@nestjs/common';
import { UserGroupMapPermissionService } from './user-group-map-permission.service';
import { UserGroupMapPermissionController } from './user-group-map-permission.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserGroupMapPermissionController],
  providers: [UserGroupMapPermissionService],
})
export class UserGroupMapPermissionModule {}
