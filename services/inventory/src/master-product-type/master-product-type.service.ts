import { Injectable } from '@nestjs/common';
import { MasterProductTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductTypeService {
  constructor(private masterProductTypeRepo: MasterProductTypeRepository) {}

  create(data: Prisma.masterProductTypeCreateInput) {
    const condition = {
      data: data,
    } as Prisma.masterProductTypeCreateArgs;
    return this.masterProductTypeRepo.create(condition);
  }

  findAll() {
    return this.masterProductTypeRepo.findAll();
  }
  findOne(condition: Prisma.masterProductTypeFindManyArgs) {
    return this.masterProductTypeRepo.findOne(condition);
  }

  findMany(condition: Prisma.masterProductTypeFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    };
    return this.masterProductTypeRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.masterProductTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.masterProductTypeUpdateArgs;
    return await this.masterProductTypeRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterProductTypeDeleteArgs;
    return await this.masterProductTypeRepo.delete(condition);
  }
}
