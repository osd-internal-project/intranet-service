import { CustomerBranchRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerBranchService {
  constructor(private readonly customerBranchRepo: CustomerBranchRepository) {}
  create(data: Prisma.customerBranchCreateInput) {
    return this.customerBranchRepo.create({ data: data });
  }
  findAll() {
    return this.customerBranchRepo.findAll();
  }
  findMany(condition: Prisma.customerBranchFindManyArgs) {
    return this.customerBranchRepo.findMany(condition);
  }

  findOneById(id: number) {
    return this.customerBranchRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerBranchRepo.findOne({
      where: { id: id },
      include: { customerAddress: true, customerContact: true },
    });
  }
  update(id: number, data: Prisma.customerBranchUpdateInput) {
    return this.customerBranchRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerBranchRepo.delete({ where: { id: id } });
  }
}
