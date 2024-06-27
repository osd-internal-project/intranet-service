import { Module } from '@nestjs/common';
import { TicketHistoryLogsService } from './ticket-history-logs.service';
import { TicketHistoryLogsController } from './ticket-history-logs.controller';
import { PrismaModule } from '@inventory/share';

@Module({
  imports: [PrismaModule],
  controllers: [TicketHistoryLogsController],
  providers: [TicketHistoryLogsService],
})
export class TicketHistoryLogsModule {}
