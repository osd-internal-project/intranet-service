import { Injectable } from '@nestjs/common';
import { CustomerGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class CustomerGroupService {
  constructor(private readonly customerGroupRepo: CustomerGroupRepository) {}
  create(data: Prisma.customerGroupCreateInput) {
    const condition = {
      data: data,
    } as Prisma.customerGroupCreateArgs;
    return this.customerGroupRepo.create(condition);
  }

  findAll() {
    return this.customerGroupRepo.findAll();
  }

  findOne(condition: Prisma.customerGroupFindFirstArgs) {
    return this.customerGroupRepo.findOne(condition);
  }

  findActive() {
    return this.customerGroupRepo.findMany({
      where: { activeStatus: true },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
  findMany(condition: Prisma.customerGroupFindManyArgs) {
    return this.customerGroupRepo.findMany({
      ...condition,
      orderBy: [{ createdAt: 'asc' }],
    });
  }

  update(id: number, data: Prisma.customerGroupUpdateInput) {
    return this.customerGroupRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.customerGroupRepo.delete({ where: { id: id } });
  }
}
