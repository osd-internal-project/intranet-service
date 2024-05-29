import { Injectable } from '@nestjs/common';
import { BrandRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private brandRepo: BrandRepository) {}

  create(data: Prisma.brandCreateInput) {
    const condition = { data: data } as Prisma.brandCreateArgs;
    return this.brandRepo.create(condition);
  }

  findAll() {
    return this.brandRepo.findAll();
  }

  findMany(condition: Prisma.brandFindManyArgs) {
    return this.brandRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.brandUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.brandUpdateArgs;
    return await this.brandRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.brandDeleteArgs;
    return await this.brandRepo.delete(condition);
  }
}
