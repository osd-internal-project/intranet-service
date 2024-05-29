import { Injectable } from '@nestjs/common';
import { MasterPositionRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterPositionService {
  constructor(private masterPositionRepo: MasterPositionRepository) {}

  create(data: Prisma.masterPositionCreateInput) {
    const condition = { data: data } as Prisma.masterPositionCreateArgs;
    return this.masterPositionRepo.create(condition);
  }

  findAll() {
    return this.masterPositionRepo.findAll();
  }

  findByCondition(condition: Prisma.masterPositionFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.masterPositionRepo.findByCondition(condition);
  }

  async update(id: number, data: Prisma.masterPositionUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterPositionUpdateArgs;
    return await this.masterPositionRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.masterPositionDeleteArgs;
    return await this.masterPositionRepo.delete(condition);
  }
}
