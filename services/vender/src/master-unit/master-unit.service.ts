import { Injectable } from '@nestjs/common';
import { MasterUnitRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterUnitService {
  constructor(private masterUnitRepo: MasterUnitRepository) {}

  create(data: Prisma.masterUnitCreateInput) {
    const condition = { data: data } as Prisma.masterUnitCreateArgs;
    return this.masterUnitRepo.create(condition);
  }

  findAll() {
    return this.masterUnitRepo.findAll();
  }

  findMany(condition: Prisma.masterUnitFindManyArgs) {
    return this.masterUnitRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.masterUnitUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterUnitUpdateArgs;
    return await this.masterUnitRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.masterUnitDeleteArgs;
    return await this.masterUnitRepo.delete(condition);
  }
}
