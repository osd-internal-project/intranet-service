import { Injectable } from '@nestjs/common';
import { MasterProductCategoriesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductCategoriesService {
  constructor(
    private masterProductCategoriesRepo: MasterProductCategoriesRepository,
  ) {}

  create(data: Prisma.masterProductCategoriesCreateInput) {
    return this.masterProductCategoriesRepo.create({ data: data });
  }

  findAll() {
    return this.masterProductCategoriesRepo.findAll();
  }
  findMany(search: any) {
    return this.masterProductCategoriesRepo.findMany({ where: search });
  }
  findFirst(id: number) {
    return this.masterProductCategoriesRepo.findFirst({ where: { id } });
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
