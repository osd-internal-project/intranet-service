import { Module } from '@nestjs/common';
import { DataLeaveService } from './data-leave.service';
import { DataLeaveController } from './data-leave.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [DataLeaveController],
  providers: [DataLeaveService],
})
export class DataLeaveModule {}
