import {
  CustomerBranchRepository,
  CustomerProjectRepository,
  CustomerDetailRepository,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerBranchService {
  constructor(
    private readonly customerBranchRepo: CustomerBranchRepository,
    private readonly customerProjectRepo: CustomerProjectRepository,
    private readonly customerDetailRepo: CustomerDetailRepository,
  ) {}
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
  findDetailByCustomerId(id: number) {
    return this.customerBranchRepo.findMany({
      where: { customerDetailSub: { customerDetailId: id } },
      include: { customerAddress: true, customerContact: true },
    });
  }
  async findCustomerProjectBycustomerId(id: number) {
    // const rescustomerDetail = (await this.customerDetailRepo.findOne({
    //   where: { id: id },
    //   include: {
    //     customerBranch: true,
    //   },
    // })) as any;
    const rescustomerProject = await this.customerProjectRepo.findMany({
      where: {
        // customerBranchId: { in: rescustomerDetail.customerBranch.id },
        customerBranch: { customerDetailSub: { customerDetailId: id } },
      },
      include: {
        customerBranch: true,
      },
    });
    return rescustomerProject;
  }
  update(id: number, data: Prisma.customerBranchUpdateInput) {
    return this.customerBranchRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerBranchRepo.delete({ where: { id: id } });
  }
}
