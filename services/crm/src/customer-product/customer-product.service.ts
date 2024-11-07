import { AccessService, CustomerProductRepository } from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProductService {
  constructor(
    private readonly customerProductRepo: CustomerProductRepository,
    private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.customerProductCreateInput) {
    return this.customerProductRepo.create({ data: data });
  }
  findAll() {
    return this.customerProductRepo.findAll();
  }
  findMany(condition: Prisma.customerProductFindManyArgs) {
    return this.customerProductRepo.findMany(condition);
  }
  findActive() {
    return this.customerProductRepo.findMany({
      where: { activeStatus: true },
    });
  }
  async findDatatable(search?: any, take?: number, skip?: number) {
    const { name } = search || {};
    const data = await this.customerProductRepo.findMany({
      where: { ...(name && { name: { contains: name } }) },
      ...(take && skip && { take: +take, skip: +skip }),
      orderBy: { createdAt: 'asc' },
    });
    const count = await this.customerProductRepo.count({});
    return { data: data, count: count };
  }

  findOneById(id: number) {
    return this.customerProductRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerProductRepo.findOne({
      where: { id: id },
    });
  }
  findByCustomerGroup(customerGroupId: number, search: any) {
    const { productName } = search || {};
    return this.customerProductRepo.findMany({
      where: {
        ...(productName && { name: { contains: productName } }),
        customerProjectProductMap: {
          some: {
            customerProject: {
              customerBranch: {
                customerDetail: { customerGroupId: customerGroupId },
              },
            },
          },
        },
      },
    });
  }
  findByCustomer(customerId: number, search: any) {
    const { productName } = search || {};
    return this.customerProductRepo.findMany({
      where: {
        ...(productName && { name: { contains: productName } }),
        customerProjectProductMap: {
          some: {
            customerProject: {
              customerBranch: {
                customerDetailId: customerId,
              },
            },
          },
        },
      },
    });
  }
  findByBranch(branchId: number, search: any) {
    const { productName } = search || {};

    return this.customerProductRepo.findMany({
      where: {
        ...(productName && { name: { contains: productName } }),
        customerProjectProductMap: {
          some: {
            customerProject: {
              customerBranchId: branchId,
            },
          },
        },
      },
    });
  }
  update(id: number, data: Prisma.customerProductUpdateInput) {
    return this.customerProductRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerProductRepo.delete({ where: { id: id } });
  }
}
