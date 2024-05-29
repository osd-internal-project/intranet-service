import { Injectable } from '@nestjs/common';
import { MasterHazardtypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterHazardtypeService {
  constructor(private masterHazardtypeRepo: MasterHazardtypeRepository) {}

  create(data: Prisma.masterHazardtypeCreateInput) {
    const condition = { data: data } as Prisma.masterHazardtypeCreateArgs;
    return this.masterHazardtypeRepo.create(condition);
  }

  findAll() {
    return this.masterHazardtypeRepo.findAll();
  }

  findByCondition(condition: Prisma.masterHazardtypeFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.masterHazardtypeRepo.findMany(condition);
  }
  findOneByCondition(condition: Prisma.masterHazardtypeFindFirstArgsBase) {
    condition = {
      ...condition,
    };
    return this.masterHazardtypeRepo.findOne(condition);
  }
  async update(id: number, data: Prisma.masterHazardtypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterObjectiveUpdateArgs;
    
    return await this.masterHazardtypeRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterHazardtypeDeleteArgs;
    return await this.masterHazardtypeRepo.delete(condition);
  }
}
