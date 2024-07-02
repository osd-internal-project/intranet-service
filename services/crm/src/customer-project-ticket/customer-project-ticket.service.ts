import {
  CustomerFilesRepository,
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
    private readonly customerFilesRepo: CustomerFilesRepository,
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
  async findDetailById(id: number) {
    const detail = await this.customerProjectTicketRepo.findOne({
      where: { id: id },
      include: { ticketHistoryLogs: true },
    });
    const createFiles = await this.customerFilesRepo.findMany({
      where: { customerProjectTicketId: id, type: 'create-attend' },
    });
    const updateFiles = await this.customerFilesRepo.findMany({
      where: { customerProjectTicketId: id, type: 'update-attend' },
    });
    return { ...detail, createFiles: createFiles, updateFiles: updateFiles };
  }
  async findDatatableUserId(
    userId: string,
    query: object,
    skip: number,
    take: number,
  ) {
    const data = await this.customerProjectTicketRepo.findMany({
      where: { OR: [{ createdById: userId }, { assignId: userId }], ...query },

      skip: skip,
      take: take,
    });
    const total = await this.customerProjectTicketRepo.count({
      where: { OR: [{ createdById: userId }, { assignId: userId }] },
    });
    return { data: data, total: total };
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
