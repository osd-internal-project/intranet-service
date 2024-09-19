import {
  CustomerDetailSubRepository,
  CustomerProjectRepository,
  CustomerDetailRepository,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerDetailSubService {
  constructor(
    private readonly customerDetailSubRepo: CustomerDetailSubRepository,
    private readonly customerProjectRepo: CustomerProjectRepository,
    private readonly customerDetailRepo: CustomerDetailRepository,
  ) {}
  create(data: Prisma.customerDetailSubCreateInput) {
    return this.customerDetailSubRepo.create({ data: data });
  }
  findAll() {
    return this.customerDetailSubRepo.findAll();
  }
  findMany(condition: Prisma.customerDetailSubFindManyArgs) {
    return this.customerDetailSubRepo.findMany(condition);
  }
  findByCustomerId(customerId: number) {
    return this.customerDetailSubRepo.findMany({
      where: { customerDetailId: customerId },
      include: { customerBranch: true },
    });
  }
  findDetailListByCustomerId(customerId: number) {
    return this.customerDetailSubRepo.findMany({
      where: { customerDetailId: customerId },
    });
  }
  findOneById(id: number) {
    return this.customerDetailSubRepo.findOne({ where: { id: id } });
  }

  update(id: number, data: Prisma.customerDetailSubUpdateInput) {
    return this.customerDetailSubRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerDetailSubRepo.delete({ where: { id: id } });
  }
}
