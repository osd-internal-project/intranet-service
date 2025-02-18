import { AccessService, CustomerGroupRepository } from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerGroupService {
  constructor(
    private readonly customerGroupRepo: CustomerGroupRepository,
    private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.customerGroupCreateInput) {
    return this.customerGroupRepo.create({ data: data });
  }
  findAll() {
    return this.customerGroupRepo.findAll();
  }
  findMany(condition: Prisma.customerGroupFindManyArgs) {
    return this.customerGroupRepo.findMany(condition);
  }
  async findDatatable(search?: any, take?: number, skip?: number) {
    const { customerGroupCode, customerGroupName } = search || {};
    const data = await this.customerGroupRepo.findMany({
      where: {
        ...(customerGroupCode && {
          customerGroupCode: { contains: customerGroupCode },
        }),
        ...(customerGroupName && {
          customerGroupName: { contains: customerGroupName },
        }),
      },
      ...(take && skip && { take: +take, skip: +skip }),
      orderBy: { createdAt: 'asc' },
    });
    const count = await this.customerGroupRepo.count({
      where: {
        ...(customerGroupCode && {
          customerGroupCode: { contains: customerGroupCode },
        }),
        ...(customerGroupName && {
          customerGroupName: { contains: customerGroupName },
        }),
      },
    });
    return { data: data, count: count };
  }

  findOneById(id: number) {
    return this.customerGroupRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerGroupRepo.findOne({
      where: { id: id },
    });
  }
  update(id: number, data: Prisma.customerGroupUpdateInput) {
    return this.customerGroupRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerGroupRepo.delete({ where: { id: id } });
  }
}
