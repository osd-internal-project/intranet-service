import { Injectable } from '@nestjs/common';
import { CustomerTypeGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class CustomerTypeGroupService {
  constructor(
    private readonly customerTypeGroupRepo: CustomerTypeGroupRepository,
  ) {}
  create(data: Prisma.customerTypeGroupCreateInput) {
    const condition = {
      data: data,
    } as Prisma.customerTypeGroupCreateArgs;
    return this.customerTypeGroupRepo.create(condition);
  }

  findAll() {
    return this.customerTypeGroupRepo.findAll();
  }

  findOne(condition: Prisma.customerTypeGroupFindFirstArgs) {
    return this.customerTypeGroupRepo.findOne(condition);
  }

  findActive() {
    return this.customerTypeGroupRepo.findMany({
      where: { activeStatus: true },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
  findMany(condition: Prisma.customerTypeGroupFindManyArgs) {
    return this.customerTypeGroupRepo.findMany({
      ...condition,
      orderBy: [{ createdAt: 'asc' }],
    });
  }

  update(id: number, data: Prisma.customerTypeGroupUpdateInput) {
    return this.customerTypeGroupRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.customerTypeGroupRepo.delete({ where: { id: id } });
  }
}
