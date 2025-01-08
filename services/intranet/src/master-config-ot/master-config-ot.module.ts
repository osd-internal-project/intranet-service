import { Module } from '@nestjs/common';
import { PrismaModule } from '@inventory/share';
import { MasterConfigOvertimeController } from './master-config-ot.controller';
import { MasterConfigOvertimeService } from './master-config-ot.service';

@Module({
  imports: [PrismaModule],
  controllers: [MasterConfigOvertimeController],
  providers: [MasterConfigOvertimeService],
})
export class MasterConfigOvertimeModule {}
