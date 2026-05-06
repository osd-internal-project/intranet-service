import { Module } from '@nestjs/common';
import { MasterTypeEventsService } from './master-type-events.service';
import { MasterTypeEventsController } from './master-type-events.controller';

@Module({
  controllers: [MasterTypeEventsController],
  providers: [MasterTypeEventsService]
})
export class MasterTypeEventsModule {}
