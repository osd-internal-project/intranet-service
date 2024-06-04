import { Injectable } from '@nestjs/common';
import { MaTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class MaTaskService {
  constructor(private readonly maTaskRepo: MaTaskRepository) {}
  create(data: Prisma.maTaskCreateInput) {
    const condition = {
      data: data,
    } as Prisma.maTaskCreateArgs;
    return this.maTaskRepo.create(condition);
  }

  findAll() {
    return this.maTaskRepo.findAll();
  }

  findOne(condition: Prisma.maTaskFindFirstArgs) {
    return this.maTaskRepo.findOne(condition);
  }

  findMany(condition: Prisma.maTaskFindManyArgs) {
    return this.maTaskRepo.findMany(condition);
  }

  update(id: number, data: Prisma.maTaskUpdateInput) {
    return this.maTaskRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.maTaskRepo.delete({ where: { id: id } });
  }
}
