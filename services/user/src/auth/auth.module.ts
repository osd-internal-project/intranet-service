import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule, AuthguardModule } from '@inventory/share';
import { UserService } from '../user/user.service';
import { UserGroupMapService } from '../user-group-map/user-group-map.service';
import { UserRoleMapService } from '../user-role-map/user-role-map.service';
// import { JwtService } from './jwt.service';
@Module({
  imports: [PrismaModule, AuthguardModule],
  controllers: [AuthController],
  providers: [UserService, UserGroupMapService, UserRoleMapService],
})
export class AuthModule {}
