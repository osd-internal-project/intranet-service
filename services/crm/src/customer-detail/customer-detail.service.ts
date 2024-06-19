import { Injectable, Logger } from '@nestjs/common';
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
  async findDataTable(query: any) {
    const { take, skip, typeid, maName, maDate, contact, maStatus } = query;
    const data = await this.customerDetailRepo.findMany({
      // where: {
      //   ...(typeid && { maTypeId: Number(typeid) }),
      //   ...(maName && { maName: { contains: maName } }),
      //   ...(maDate && {
      //     maDate: {
      //       gte: this.startOfDate(maDate[0]),
      //       lte: this.endOfDate(maDate[1]),
      //     },
      //   }),
      //   ...(contact && { contact: { contains: contact } }),
      //   ...(maStatus && { maStatus: maStatus }),
      // },
      orderBy: [{ createdAt: 'desc' }],
      take: +take,
      skip: +skip,
    });
    const count = await this.customerDetailRepo.count({
      // where: {
      //   ...(typeid && { maTypeId: Number(typeid) }),
      //   ...(maName && { maName: { contains: maName } }),
      //   ...(maDate && {
      //     maDate: {
      //       gte: this.startOfDate(maDate[0]),
      //       lte: this.endOfDate(maDate[1]),
      //     },
      //   }),
      //   ...(contact && { contact: { contains: contact } }),
      //   ...(maStatus && { maStatus: maStatus }),
      // },
    });
    return { data: data, count: count };
  }

  // async findRangeEvent(query: any) {
  //   const { start, end } = query;
  //   const data = await this.customerDetailRepo.findMany({
  //     where: {
  //       ...(start &&
  //         end && {
  //           maDate: {
  //             gte: this.startOfDate(start),
  //             lte: this.endOfDate(end),
  //           },
  //         }),
  //     },
  //     orderBy: [{ createdAt: 'desc' }],
  //   });
  //   return data;
  // }

  findMany(condition: Prisma.customerDetailFindManyArgs) {
    return this.customerDetailRepo.findMany(condition);
  }

  update(id: number, data: Prisma.customerDetailUpdateInput) {
    Logger.debug(data);
    return this.customerDetailRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.customerDetailRepo.delete({ where: { id: id } });
  }
}
