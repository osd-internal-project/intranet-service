import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthguardModule, PrismaModule } from '@inventory/share';
import { JwtService } from '@nestjs/jwt';
import { MasterRuleService } from 'src/master-rule/master-rule.service';
import { ProfileRuleService } from 'src/profile-rule/profile-rule.service';
import { UserRoleService } from 'src/user-role/user-role.service';

@Module({
  imports: [PrismaModule, AuthguardModule],
  controllers: [UserController],
  providers: [
    UserService,
    MasterRuleService,
    ProfileRuleService,
    UserRoleService,
    JwtService,
  ],
})
export class UserModule {}
