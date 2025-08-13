import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  MasterProductRepository,
  // OrderLotRepository,
  OrderRepository,
} from '@inventory/share';
import dayjs from 'dayjs';

@Injectable()
export class OrderLotService {
  constructor(
    private readonly orderRepo: OrderRepository,
    // private readonly orderlotRepo: OrderLotRepository,
    private readonly masterproductRepo: MasterProductRepository,
  ) {}
  // create(createOrderLotDto: Prisma.orderLotCreateInput) {
  //   return this.orderlotRepo.create({ data: { ...createOrderLotDto } });
  // }

  // async findAll(query: Prisma.orderLotWhereInput, skip: number, take: number) {
  //   let filter = {};
  //   if (query.oderId) {
  //     filter = { ...filter, oderId: query.oderId };
  //   }
  //   if (query?.createdAt) {
  //     filter = {
  //       ...filter,
  //       createdAt: {
  //         gte: dayjs(query.createdAt as string)
  //           .startOf('date')
  //           .toDate(),
  //         lte: dayjs(query.createdAt as string)
  //           .endOf('date')
  //           .toDate(),
  //       },
  //     };
  //   }
  //   const data = await this.orderlotRepo.findMany({
  //     where: filter,
  //     skip,
  //     take,
  //   });
  //   const count = await this.orderlotRepo.count({ where: filter });
  //   return { data, count };
  // }

  // async findOne(barcode: string) {
  //   const data = await this.orderlotRepo.findOne({
  //     where: { barcode },
  //     include: {
  //       order: {
  //         include: { masterProduct: { include: { masterProductImage: true } } },
  //       },
  //     },
  //   });
  //   return data;
  // }

  // async update(id: number, updateOrderLotDto: Prisma.orderLotUpdateInput) {
  //   const findOrderLot = (await this.orderlotRepo.findOne({
  //     where: { id },
  //     include: {
  //       order: {
  //         include: { masterProduct: { include: { masterProductImage: true } } },
  //       },
  //     },
  //   })) as any;
  //   const calculateCheckStock = findOrderLot.order.masterProduct.totalQty - 1;
  //   if (calculateCheckStock <= 0) {
  //     await this.orderRepo.update({
  //       where: { oderId: findOrderLot.oderId },
  //       data: { status: 'out-stock' },
  //     });
  //   }
  //   await this.masterproductRepo.update({
  //     where: { prdId: findOrderLot.prdId },
  //     data: {
  //       totalQty: calculateCheckStock,
  //     },
  //   });

  //   return this.orderlotRepo.update({
  //     where: { id },
  //     data: { ...updateOrderLotDto },
  //   });
  // }

  // remove(id: number) {
  //   return this.orderlotRepo.delete({ where: { id } });
  // }
}
