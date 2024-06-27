import {
  CustomerProjectTicketRepository,
  TicketHistoryLogsRepository,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectTicketService {
  constructor(
    private readonly customerProjectTicketRepo: CustomerProjectTicketRepository,
    private readonly ticketHistoryLogsRepo: TicketHistoryLogsRepository,
  ) {}
  create(data: Prisma.customerProjectTicketCreateInput) {
    return this.customerProjectTicketRepo.create({ data: data });
  }
  findAll() {
    return this.customerProjectTicketRepo.findAll();
  }
  findMany(condition: Prisma.customerProjectTicketFindManyArgs) {
    return this.customerProjectTicketRepo.findMany(condition);
  }
  findByTaskId(taskId: number) {
    return this.customerProjectTicketRepo.findMany({
      where: { customerProjectTaskId: taskId },
    });
  }
  findByProjectId(project: number) {
    return this.customerProjectTicketRepo.findMany({
      where: { customerProjectId: project, customerProjectTaskId: null },
    });
  }
  findOneById(id: number) {
    return this.customerProjectTicketRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerProjectTicketRepo.findOne({
      where: { id: id },
      include: { ticketHistoryLogs: true },
    });
  }
  update(id: number, data: Prisma.customerProjectTicketUpdateInput) {
    return this.customerProjectTicketRepo.update({
      where: { id: id },
      data: data,
    });
  }

  remove(id: number) {
    return this.customerProjectTicketRepo.delete({ where: { id: id } });
  }
}
