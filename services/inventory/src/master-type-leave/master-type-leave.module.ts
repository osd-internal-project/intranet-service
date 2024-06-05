import { Module } from '@nestjs/common';
import { MasterTypeLeaveService } from './master-type-leave.service';
import { MasterTypeLeaveController } from './master-type-leave.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterTypeLeaveController],
  providers: [MasterTypeLeaveService],
})
export class MasterTypeLeaveModule {}
