import {
  AccessService,
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
    private readonly accessService: AccessService,
  ) {}
  async create(data: Prisma.customerProjectTicketCreateInput) {
    let createdData = data;
    if (data.createdById) {
      const createdGroup = await this.accessService.getOwnerGroupByUserId(
        data.createdById,
      );
      createdData = { ...createdData, createdGroupId: createdGroup.groupId };
    }
    if (data.assignId) {
      const assignGroup = await this.accessService.getOwnerGroupByUserId(
        data.assignId,
      );
      createdData = { ...createdData, assignGroupId: assignGroup.groupId };
    }
    return this.customerProjectTicketRepo.create({ data: createdData });
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
      orderBy: [{ createdAt: 'desc' }],
    });
  }
  findByProjectId(project: number) {
    return this.customerProjectTicketRepo.findMany({
      where: { customerProjectId: project, customerProjectTaskId: null },
      orderBy: [{ createdAt: 'desc' }],
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
      orderBy: [{ createdAt: 'desc' }],
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
