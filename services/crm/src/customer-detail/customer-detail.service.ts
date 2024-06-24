import { Injectable } from '@nestjs/common';
import {
  CustomerFilesRepository,
  CustomerDetailRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class CustomerDetailService {
  constructor(
    private readonly customerDetailRepo: CustomerDetailRepository,
    private readonly customerFilesReposito: CustomerFilesRepository,
  ) {}
  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }
  create(data: Prisma.customerDetailCreateInput) {
    const condition = {
      data: data,
    } as Prisma.customerDetailCreateArgs;
    return this.customerDetailRepo.create(condition);
  }

  findAll() {
    return this.customerDetailRepo.findAll();
  }

  findOne(condition: Prisma.customerDetailFindFirstArgs) {
    return this.customerDetailRepo.findOne(condition);
  }
  async findOneById(id: number) {
    const customers = await this.customerDetailRepo.findOne({
      where: { id: id },
    });

    return customers;
  }

  findMany(query: any) {
    const { refcode, customername, activestatus } = query;

    return this.customerDetailRepo.findMany({
      where: {
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(customername && {
          OR: [
            { prefixTh: { contains: customername } },
            { firstNameTh: { contains: customername } },
            { lastNameTh: { contains: customername } },
          ],
        }),
      },
    });
  }

  async findDatatable(query: any) {
    const { refcode, customername, activestatus, take, skip } = query;

    const data = await this.customerDetailRepo.findMany({
      where: {
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(customername && {
          OR: [
            { prefixTh: { contains: customername } },
            { firstNameTh: { contains: customername } },
            { lastNameTh: { contains: customername } },
          ],
        }),
      },
      ...(take && { take: Number(take) }),
      ...(skip && { skip: Number(skip) }),
    });
    const count = await this.customerDetailRepo.count({
      where: {
        ...(refcode && { referenceCode: { contains: refcode } }),
        ...(activestatus && { activeStatus: JSON.parse(activestatus) }),
        ...(customername && {
          OR: [
            { prefixTh: { contains: customername } },
            { firstNameTh: { contains: customername } },
            { lastNameTh: { contains: customername } },
          ],
        }),
      },
    });
    return { data: data, count: count };
  }

  findActiveForProject() {
    return this.customerDetailRepo.findMany({
      where: { activeStatus: true },
      // select: {
      //   id: true,
      //   prefixTh: true,
      //   firstNameTh: true,
      //   lastNameTh: true,
      //   customerBranch: {
      //     select: {
      //       id: true,
      //       branchName: true,
      //       customerAddress: true,
      //       customerContact: true,
      //     },
      //   },
      // },
    });
  }

  update(id: number, data: Prisma.customerDetailUpdateInput) {
    return this.customerDetailRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.customerDetailRepo.delete({ where: { id: id } });
  }
}
