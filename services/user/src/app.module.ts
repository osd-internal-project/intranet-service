import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvoteController } from './app.controller';
import { EvoteService } from './app.service';
import configs from './configs';
import { UserModule } from './user/user.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { OrganizedModule } from './organized/organized.module';
import { ProfileRuleMapModule } from './profile-rule-map/profile-rule-map.module';
import { ProfileRuleModule } from './profile-rule/profile-rule.module';
import { UserGroupMapModule } from './user-group-map/user-group-map.module';
import { UserGroupModule } from './user-group/user-group.module';
import { UserRoleMapModule } from './user-role-map/user-role-map.module';
import { UserRoleModule } from './user-role/user-role.module';
import { MasterRuleModule } from './master-rule/master-rule.module';
import { MasterPositionModule } from './master-position/master-position.module';
import { UserGroupMapPermissionModule } from './user-group-map-permission/user-group-map-permission.module';
import { UsersModule } from './users/users.module';
import { UserPermissionTypeModule } from './user-permission-type/user-permission-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    //Auth
    AuthModule,
    MasterPositionModule,
    MasterRuleModule,
    OrganizedModule,
    ProfileRuleModule,
    ProfileRuleMapModule,
    UserRoleModule,
    UserRoleMapModule,
    UserModule,
    UserGroupModule,
    UserGroupMapModule,
    UserGroupMapPermissionModule,
    UsersModule,
    UserPermissionTypeModule,
  ],
  controllers: [EvoteController],
  providers: [EvoteService],
})
export class EvoteMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
