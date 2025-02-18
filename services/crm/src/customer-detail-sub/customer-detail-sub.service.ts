import {
  CustomerDetailSubRepository,
  CustomerProjectRepository,
  CustomerDetailRepository,
} from '@inventory/share';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerDetailSubService {
  constructor(
    private readonly customerDetailSubRepo: CustomerDetailSubRepository,
    private readonly customerProjectRepo: CustomerProjectRepository,
    private readonly customerDetailRepo: CustomerDetailRepository,
  ) {}
  create(data: Prisma.customerDetailSubCreateInput) {
    try {
      return this.customerDetailSubRepo.create({ data: data });
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
  findAll() {
    return this.customerDetailSubRepo.findAll();
  }
  findMany(condition: Prisma.customerDetailSubFindManyArgs) {
    return this.customerDetailSubRepo.findMany(condition);
  }

  findDetailById(id: number) {
    return this.customerDetailSubRepo.findOne({
      where: { id: id },
      include: { customerAddress: true, customerContact: true },
    });
  }
  findDetailListByCustomerId(customerDetailId: number, search: any) {
    try {
      console.log(customerDetailId, search);
      const { customerName, referenceCode, customerSubName, productName } =
        search || {};
      return this.customerDetailSubRepo.findMany({
        where: {
          customerDetailId: customerDetailId,
          ...(productName && {
            customerProject: {
              some: {
                customerProjectProductMap: {
                  some: { customerProduct: { name: productName } },
                },
              },
            },
          }),
          ...(customerSubName && { name: { contains: customerSubName } }),
          customerDetail: {
            ...(referenceCode && { referenceCode: referenceCode }),
            ...(customerName && {
              OR: [
                { customerNameEn: { contains: customerName } },
                { customerNameTh: { contains: customerName } },
              ],
            }),
          },
        },
        include: { customerAddress: true, customerContact: true },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  findDetailListByCustomerSubId(
    customerSubId: number,
    query: Prisma.customerDetailSubWhereInput,
  ) {
    return this.customerDetailSubRepo.findMany({
      where: { ...query, id: customerSubId },
      include: { customerAddress: true, customerContact: true },
    });
  }
  async findCustomerProjectBycustomerId(id: number) {
    // const rescustomerDetail = (await this.customerDetailRepo.findOne({
    //   where: { id: id },
    //   include: {
    //     customerDetailSub: true,
    //   },
    // })) as any;
    const rescustomerProject = await this.customerProjectRepo.findMany({
      where: {
        // customerDetailSubId: { in: rescustomerDetail.customerDetailSub.id },
        customerDetailSub: { customerDetailId: id },
      },
      include: {
        customerDetailSub: true,
      },
    });
    return rescustomerProject;
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
