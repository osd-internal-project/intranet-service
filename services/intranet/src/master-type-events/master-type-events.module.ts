import { Module } from '@nestjs/common';
import { MasterTypeEventsService } from './master-type-events.service';
import { MasterTypeEventsController } from './master-type-events.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [MasterTypeEventsController],
  providers: [MasterTypeEventsService],
})
export class MasterTypeEventsModule {}
