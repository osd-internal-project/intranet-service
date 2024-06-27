import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketHistoryLogsService } from './ticket-history-logs.service';
import { Prisma } from '@prisma/client';
@Controller('ticket-history-logs')
export class TicketHistoryLogsController {
  constructor(
    private readonly ticketHistoryLogsService: TicketHistoryLogsService,
  ) {}

  @Post()
  create(
    @Body() createTicketHistoryLogsDto: Prisma.ticketHistoryLogsCreateInput,
  ) {
    return this.ticketHistoryLogsService.create(createTicketHistoryLogsDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ticketHistoryLogsUpdateInput,
  ) {
    return this.ticketHistoryLogsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketHistoryLogsService.remove(+id);
  }
  @Get('active')
  findActive() {
    return this.ticketHistoryLogsService.findActive();
  }
  @Get('many')
  findMany(
    @Param('condition') condition: Prisma.ticketHistoryLogsFindFirstArgs,
  ) {
    return this.ticketHistoryLogsService.findMany(condition);
  }
  @Get(':id')
  findOne(
    @Param('condition') condition: Prisma.ticketHistoryLogsFindFirstArgs,
  ) {
    return this.ticketHistoryLogsService.findOne(condition);
  }

  @Get()
  findAll() {
    return this.ticketHistoryLogsService.findAll();
  }
}
