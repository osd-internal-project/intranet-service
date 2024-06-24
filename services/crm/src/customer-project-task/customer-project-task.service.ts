import { CustomerProjectTaskRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectTaskService {
  constructor(
    private readonly customerProjectTaskRepo: CustomerProjectTaskRepository,
  ) {}
  create(data: Prisma.customerProjectTaskCreateInput) {
    return this.customerProjectTaskRepo.create({ data: data });
  }
  findAll() {
    return this.customerProjectTaskRepo.findAll();
  }
  findMany(condition: Prisma.customerProjectTaskFindManyArgs) {
    return this.customerProjectTaskRepo.findMany(condition);
  }

  findOneById(id: number) {
    return this.customerProjectTaskRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerProjectTaskRepo.findOne({
      where: { id: id },
    });
  }
  findByProjectId(projectId: number) {
    return this.customerProjectTaskRepo.findMany({
      where: { customerProjectId: projectId },
      include: { customerProjectTicket: true },
    });
  }
  update(id: number, data: Prisma.customerProjectTaskUpdateInput) {
    return this.customerProjectTaskRepo.update({
      where: { id: id },
      data: data,
    });
  }

  remove(id: number) {
    return this.customerProjectTaskRepo.delete({ where: { id: id } });
  }
}
