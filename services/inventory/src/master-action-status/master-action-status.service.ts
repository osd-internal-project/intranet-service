import { Injectable } from '@nestjs/common';
import { MasterActionStatusRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterActionStatusService {
  constructor(private masterActionStatusRepo: MasterActionStatusRepository) {}

  create(data: Prisma.masterActionStatusCreateInput) {
    const condition = { data: data } as Prisma.masterActionStatusCreateArgs;
    return this.masterActionStatusRepo.create(condition);
  }
  createMany(data: Prisma.masterActionStatusCreateManyInput) {
    const condition = { data: data } as Prisma.masterActionStatusCreateManyArgs;
    return this.masterActionStatusRepo.createMany(condition);
  }

  findAll() {
    return this.masterActionStatusRepo.findAll();
  }

  findMany(condition: Prisma.masterActionStatusFindManyArgs) {
    return this.masterActionStatusRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.masterActionStatusUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterActionStatusUpdateArgs;
    return await this.masterActionStatusRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterActionStatusDeleteArgs;
    return await this.masterActionStatusRepo.delete(condition);
  }
}
