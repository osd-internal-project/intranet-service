import { Module } from '@nestjs/common';
import { UserGroupMapHeaderService } from './user-group-map-header.service';
import { UserGroupMapHeaderController } from './user-group-map-header.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserGroupMapHeaderController],
  providers: [UserGroupMapHeaderService],
})
export class UserGroupMapHeaderModule {}
