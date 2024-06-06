import { Injectable } from '@nestjs/common';
import { MasterTypeLeaveRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterTypeLeaveService {
  constructor(private mastertypeleaveRepo: MasterTypeLeaveRepository) {}

  create(data: Prisma.masterTypeleaveCreateInput) {
    const condition = { data: data } as Prisma.masterHazardtypeCreateArgs;
    return this.mastertypeleaveRepo.create(condition);
  }

  findAll() {
    return this.mastertypeleaveRepo.findAll();
  }

  async findByCondition(condition: Prisma.masterTypeleaveFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return await this.mastertypeleaveRepo.findMany(condition);
  }
  findOneByCondition(condition: Prisma.masterTypeleaveFindFirstArgsBase) {
    condition = {
      ...condition,
    };
    return this.mastertypeleaveRepo.findOne(condition);
  }
  async update(id: number, data: Prisma.masterTypeleaveUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterTypeleaveUpdateArgs;

    return await this.mastertypeleaveRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterTypeleaveDeleteArgs;
    return await this.mastertypeleaveRepo.delete(condition);
  }
}
