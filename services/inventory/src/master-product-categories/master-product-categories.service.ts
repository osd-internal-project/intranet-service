import { Injectable } from '@nestjs/common';
import { MasterProductCategoriesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductCategoriesService {
  constructor(
    private masterProductCategoriesRepo: MasterProductCategoriesRepository,
  ) {}

  create(data: Prisma.masterProductCategoriesCreateInput) {
    const condition = {
      data: data,
    } as Prisma.masterProductCategoriesCreateArgs;
    return this.masterProductCategoriesRepo.create(condition);
  }

  findAll() {
    return this.masterProductCategoriesRepo.findAll();
  }
  findOne(condition: Prisma.masterProductCategoriesFindManyArgs) {
    // return this.masterProductCategoriesRepo.findOne(condition);
  }
  findMany(condition: Prisma.masterProductCategoriesFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    };
    return this.masterProductCategoriesRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.masterProductCategoriesUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterProductCategoriesUpdateArgs;
    return await this.masterProductCategoriesRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterProductCategoriesDeleteArgs;
    return await this.masterProductCategoriesRepo.delete(condition);
  }
  count() {
    const condition = {} as Prisma.masterProductCategoriesCountArgs;
    return this.masterProductCategoriesRepo.count(condition);
  }
}
