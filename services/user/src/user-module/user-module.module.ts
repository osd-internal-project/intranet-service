import { Module } from '@nestjs/common';
import { UserModuleService } from './user-module.service';
import { UserModuleController } from './user-module.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserModuleController],
  providers: [UserModuleService],
})
export class UserModuleModule {}
