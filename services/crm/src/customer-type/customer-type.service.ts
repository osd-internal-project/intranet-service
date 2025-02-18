import { Injectable } from '@nestjs/common';
import { CustomerTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class CustomerTypeService {
  constructor(private readonly customerTypeRepo: CustomerTypeRepository) {}
  create(data: Prisma.customerTypeCreateInput) {
    const condition = {
      data: data,
    } as Prisma.customerTypeCreateArgs;
    return this.customerTypeRepo.create(condition);
  }

  findAll() {
    return this.customerTypeRepo.findAll();
  }

  findOne(condition: Prisma.customerTypeFindFirstArgs) {
    return this.customerTypeRepo.findOne(condition);
  }

  findActive() {
    return this.customerTypeRepo.findMany({
      where: { activeStatus: true },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
  findMany(condition: Prisma.customerTypeFindManyArgs) {
    return this.customerTypeRepo.findMany({
      ...condition,
      orderBy: [{ createdAt: 'asc' }],
    });
  }

  update(id: number, data: Prisma.customerTypeUpdateInput) {
    return this.customerTypeRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.customerTypeRepo.delete({ where: { id: id } });
  }
}
