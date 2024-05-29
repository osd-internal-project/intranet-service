import { Module } from '@nestjs/common';
import { MasterActionStatusService } from './master-action-status.service';
import { MasterActionStatusController } from './master-action-status.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterActionStatusController],
  providers: [MasterActionStatusService],
})
export class MasterActionStatusModule {}
