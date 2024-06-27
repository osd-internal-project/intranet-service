import { Injectable } from '@nestjs/common';
import { TicketHistoryLogsRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class TicketHistoryLogsService {
  constructor(
    private readonly ticketHistoryLogsRepo: TicketHistoryLogsRepository,
  ) {}
  create(data: Prisma.ticketHistoryLogsCreateInput) {
    const condition = {
      data: data,
    } as Prisma.ticketHistoryLogsCreateArgs;
    return this.ticketHistoryLogsRepo.create(condition);
  }

  findAll() {
    return this.ticketHistoryLogsRepo.findAll();
  }

  findOne(condition: Prisma.ticketHistoryLogsFindFirstArgs) {
    return this.ticketHistoryLogsRepo.findOne(condition);
  }

  findActive() {
    return this.ticketHistoryLogsRepo.findMany({
      orderBy: [{ updatedAt: 'asc' }],
    });
  }
  findMany(condition: Prisma.ticketHistoryLogsFindManyArgs) {
    return this.ticketHistoryLogsRepo.findMany({
      ...condition,
      orderBy: [{ updatedAt: 'asc' }],
    });
  }

  update(id: number, data: Prisma.ticketHistoryLogsUpdateInput) {
    return this.ticketHistoryLogsRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.ticketHistoryLogsRepo.delete({ where: { id: id } });
  }
}
