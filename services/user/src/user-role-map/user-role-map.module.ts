import { Module } from '@nestjs/common';
import { UserRoleMapService } from './user-role-map.service';
import { UserRoleMapController } from './user-role-map.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserRoleMapController],
  providers: [UserRoleMapService],
})
export class UserRoleMapModule {}
