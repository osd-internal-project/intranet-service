import { Module } from '@nestjs/common';
import { UserMapOrganizeService } from './user-map-organize.service';
import { UserMapOrganizeController } from './user-map-organize.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserMapOrganizeController],
  providers: [UserMapOrganizeService],
})
export class UserMapOrganizeModule {}
