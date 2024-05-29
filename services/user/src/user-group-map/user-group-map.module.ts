import { Module } from '@nestjs/common';
import { UserGroupMapService } from './user-group-map.service';
import { UserGroupMapController } from './user-group-map.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserGroupMapController],
  providers: [UserGroupMapService],
})
export class UserGroupMapModule {}
