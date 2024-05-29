import { Injectable } from '@nestjs/common';
import { MasterObjectiveRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterObjectiveService {
  constructor(private masterObjectiveRepo: MasterObjectiveRepository) {}

  create(data: Prisma.masterObjectiveCreateInput) {
    const condition = { data: data } as Prisma.masterObjectiveCreateArgs;
    return this.masterObjectiveRepo.create(condition);
  }

  findAll() {
    return this.masterObjectiveRepo.findAll();
  }

  findByCondition(condition: Prisma.masterObjectiveFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.masterObjectiveRepo.findMany(condition);
  }
  findOneByCondition(condition: Prisma.masterObjectiveFindFirstArgs) {
    condition = {
      ...condition,
    };
    return this.masterObjectiveRepo.findOne(condition);
  }
  async update(id: number, data: Prisma.masterObjectiveUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterObjectiveUpdateArgs;
    return await this.masterObjectiveRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.masterObjectiveDeleteArgs;
    return await this.masterObjectiveRepo.delete(condition);
  }
}
