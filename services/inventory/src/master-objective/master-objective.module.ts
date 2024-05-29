import { Module } from '@nestjs/common';
import { MasterObjectiveService } from './master-objective.service';
import { MasterObjectiveController } from './master-objective.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterObjectiveController],
  providers: [MasterObjectiveService],
})
export class MasterObjectiveModule {}
