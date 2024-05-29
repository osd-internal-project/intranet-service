import { Injectable } from '@nestjs/common';
import { UnitRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(private UnitRepo: UnitRepository) {}

  create(data: Prisma.unitCreateArgs) {
    console.log(data);

    const condition = { data: data } as Prisma.unitCreateArgs;
    return this.UnitRepo.create(condition);
  }

  findAll() {
    return this.UnitRepo.findAll();
  }

  findMany(condition: Prisma.unitFindManyArgs) {
    return this.UnitRepo.findMany({
      ...condition,
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: number, data: Prisma.unitUpdateInput) {
    const condition = {
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.unitUpdateArgs;
    return await this.UnitRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.unitDeleteArgs;
    return await this.UnitRepo.delete(condition);
  }
}
