import { Module } from '@nestjs/common';
import { UserHeaderTypeService } from './user-header-type.service';
import { UserHeaderTypeController } from './user-header-type.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserHeaderTypeController],
  providers: [UserHeaderTypeService],
})
export class UserHeaderTypeModule {}
