import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  InventoryLotRepository,
  OrderLotRepository,
  OrderRepository,
  TransactionRepository,
} from '@inventory/share';
import { Prisma, inventoryStock } from '@prisma/client';
import { ITypeCreateOrderLots, ITypeRestoreInventoryLots } from './common';

@Injectable()
export class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private transactionRepo: TransactionRepository,
    private inventoryLotRepo: InventoryLotRepository,
    private orderLotRepo: OrderLotRepository,
  ) {}

  async create(
    data: Prisma.orderCreateInput,
    orderLots: ITypeCreateOrderLots[],
  ) {
    let check = true;
    const inventoryLotsUpdate = [];
    await Promise.all(
      orderLots?.map(async (lot) => {
        const checkLot = await this.inventoryLotRepo.findOne({
          where: { id: lot.inventoryLotId },
        });
        if (checkLot) {
          const checkRemain = checkLot.qty - lot.qty;

          if (checkRemain >= 0) {
            inventoryLotsUpdate.push({
              id: lot.inventoryLotId,
              remain: checkRemain,
              qty: checkLot.qty - lot.qty,
            });
          } else {
            check = false;
          }
        } else {
          check = false;
        }
      }),
    );
    Logger.debug(check);
    if (check) {
      inventoryLotsUpdate.map(async (data) => {
        await this.inventoryLotRepo.update({
          where: { id: data.id },
          data: { remain: data.remain, qty: data.qty },
        });
      });

      const lastId = await this.orderRepo.findOne({
        select: { id: true },
        orderBy: { id: 'desc' },
      });
      let orderId = '#000001';
      if (lastId) {
        orderId = '#' + (lastId.id + 1).toString().padStart(6, '0');
      }
      const orderCondition = {
        data: {
          orderId: orderId,
          ...data,
          status: 'new',
        },
      } as Prisma.orderCreateArgs;
      const order = await this.orderRepo.create(orderCondition);

      if (order) {
        const orderLotsCondition = orderLots.map(
          (lot: ITypeCreateOrderLots) => ({
            productName: lot.masterProductDetails.map((d) => d.name).join(', '),
            casNo: lot.casNo,
            groupName: lot.groupName,
            qty: lot.qty,
            price: lot.price,
            totalPrice: lot.orderPrice,
            orderId: order.id,
            unit: lot.unit,
            status: 'created',
            inventoryLotId: lot.inventoryLotId,
            expiredStatus: lot.expiredStatus,
            ownerGroup: order.ownerGroup,
            lotNo: lot.lotNo,
            detailLot: lot.detailLot,
          }),
        );
        await this.orderLotRepo.createMany({
          data: orderLotsCondition,
        });

        const transactionCondition = orderLots.map(
          (lot: ITypeCreateOrderLots) => ({
            productName: lot.masterProductDetails.map((d) => d.name).join(', '),
            casNo: lot.casNo,
            location: order.locationName,
            locationId: order.locationId,
            inventory: order.inventoryName,
            inventoryId: order.inventoryId,
            chemicalFormula: lot.chemicalFormula,
            groupId: String(lot.groupId),
            groupName: lot.groupName,
            vender: lot.vender,
            brand: lot.brand,
            status: 'pay',
            qty: lot.qty,
            unit: lot.unit,
            updatedById: order.createdById,
            updatedByName: order.createdByName,
            orderStatus: 'new',
            orderId: order.id,
            objective: order.objectiveName,
            updatedAt: new Date(),
            price: lot.price,
            ownerGroup: order.ownerGroup,
            requesterId: order.requesterId,
            requesterName: order.requesterName,
            requesterGroupId: order.requesterGroupId,
            requesterGroupName: order.requesterGroupName,
            detailLot: lot.detailLot,
          }),
        );
        await this.transactionRepo.createMany({
          data: transactionCondition,
        });
        return order;
      } else {
        throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
  // async calculateCutStock(orderLots) {

  //   const updateStock =orderLots.map((data)=>({data}))
  //   return
  // }

  findAll() {
    return this.orderRepo.findAll();
  }

  findByCondition(condition: Prisma.orderFindManyArgs) {
    condition = {
      ...condition,

      orderBy: [
        {
          id: 'desc',
        },
      ],
    } as Prisma.orderFindManyArgs;
    return this.orderRepo.findMany(condition);
  }
  findOneByCondition(condition: Prisma.orderFindFirstArgs) {
    condition = {
      ...condition,
    };
    return this.orderRepo.findOne(condition);
  }
  async update(id: number, data: Prisma.orderUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.orderUpdateArgs;
    return await this.orderRepo.update(condition);
  }
  async updateStatus(id: number, status: string) {
    console.log(status);
    const condition = {
      where: { id: id },
      data: { status: status },
    } as Prisma.orderUpdateArgs;
    const updated = await this.orderRepo.update(condition);
    if (updated.status === 'cancel') {
      const order = await this.orderLotRepo.findMany({
        where: { orderId: id },
        select: {
          id: true,
          qty: true,
          inventoryLot: { select: { id: true, remain: true } },
        },
      });
      order.map((lot: any) => {
        this.inventoryLotRepo.update({
          where: { id: lot.inventoryLot.id },
          data: { remain: lot.inventoryLot.remain + lot.qty },
        });
      });
    }
    if (updated) {
      const condition = {
        where: { orderId: id },
        data: { orderStatus: status },
      } as Prisma.transactionUpdateArgs;
      await this.transactionRepo.updateMany(condition);
    }
    return updated;
  }
  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.orderDeleteArgs;
    return await this.orderRepo.delete(condition);
  }

  //First in First out
  // async create(
  //   data: Prisma.orderCreateInput,
  //   orderLots: ITypeCreateOrderLots[],
  // ) {
  //   const lastId = await this.orderRepo.findOne({
  //     select: { id: true },
  //     orderBy: { id: 'desc' },
  //   });
  //   let orderId = '#000001';
  //   if (lastId) {
  //     orderId = '#' + (lastId.id + 1).toString().padStart(6, '0');
  //   }
  //   const orderLotList = await this.calculateCutStock(orderLots);
  //   const total = orderLotList.reduce(
  //     (previousValue, currentValue) => {
  //       return {
  //         qty: previousValue.qty + currentValue.qty,
  //         price: previousValue.price + currentValue.price,
  //       };
  //     },
  //     {
  //       qty: 0,
  //       price: 0,
  //     },
  //   );

  //   const orderCondition = {
  //     data: {
  //       orderId: orderId,
  //       ...data,
  //       status: 'new',
  //       totalQty: total.qty,
  //       totalPrice: total.price,
  //     },
  //   } as Prisma.orderCreateArgs;

  //   const order = await this.orderRepo.create(orderCondition);
  //   if (order) {
  //     const orderLots = orderLotList.map(async (item) => {
  //       const orderLotCondition = {
  //         data: {
  //           orderId: order.id,
  //           casNo: item.casNo,
  //           groupName: item.groupName,
  //           qty: item.qty,
  //           price: item.price,
  //           unit: item.unit,
  //           createdAt: item.createdAt,
  //           orderLotCutStock: { createMany: { data: item.orderLotCutStock } },
  //         },
  //       } as Prisma.orderLotCreateArgs;
  //       const orderLot = await this.orderLotRepo.create(orderLotCondition);
  //       if (orderLot) {
  //         item.orderLotCutStock.map(async (i) => {
  //           const updateStockCondition = {
  //             where: { id: i.inventoryLotId },
  //             data: { remain: i.remain },
  //           } as Prisma.inventoryLotUpdateArgs;
  //           await this.inventoryLotRepo.update(updateStockCondition);
  //         });
  //         return orderLot;
  //       }
  //     });

  //     return { order: { ...order, orderLot: orderLots } };
  //   } else {
  //     throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // async calculateCutStock(orderLots: ITypeCreateOrderLots[]) {
  //   const data = await Promise.all(
  //     orderLots.map(async (lot: ITypeCreateOrderLots) => {
  //       let expiredCondition = {};
  //       if (lot.expiredStatus) {
  //         expiredCondition = { lte: new Date() };
  //       } else {
  //         expiredCondition = { gt: new Date() };
  //       }

  //       const stockCondition = {
  //         where: { id: lot.stockid },
  //         select: {
  //           inventoryLot: {
  //             where: { expiryDate: expiredCondition, remain: { gt: 0 } },
  //             select: {
  //               id: true,
  //               remain: true,
  //               receiptDate: true,
  //               price: true,
  //             },
  //             orderBy: { receiptDate: 'asc' },
  //           },
  //         },
  //       } as Prisma.inventoryStockFindManyArgs;
  //       const stock = (await this.inventoryStockRepo.findMany(
  //         stockCondition,
  //       )) as any;
  //       if (stock.length > 0) {
  //         const inventoryLotUsed = [];
  //         let cerrentQty = lot.qty;
  //         const stocklots = stock[0].inventoryLot;
  //         let totalPrice = 0;
  //         await stocklots.map((item) => {
  //           if (cerrentQty > 0) {
  //             if (cerrentQty > item.remain) {
  //               inventoryLotUsed.push({
  //                 // inventoryLotId: item.id,
  //                 remain: 0,
  //                 cutQty: item.remain,
  //                 inventoryLotId: item.id,
  //                 // price: item.remain * item.price,
  //               });
  //               (totalPrice += item.remain * item.price),
  //                 (cerrentQty = cerrentQty - item.remain);
  //             } else {
  //               const remainOfLot = item.remain - cerrentQty;
  //               inventoryLotUsed.push({
  //                 // inventoryLotId: item.id,
  //                 remain: remainOfLot,
  //                 cutQty: cerrentQty,
  //                 inventoryLotId: item.id,
  //                 // price: cerrentQty * item.price,
  //               });
  //               (totalPrice += cerrentQty * item.price), (cerrentQty = 0);
  //             }
  //           } else {
  //             return null;
  //           }
  //         });

  //         // while (qtySelected > 0) {}
  //         const orderlot = {
  //           productCode: lot.productCode,
  //           productName: lot.productName,
  //           casNo: lot.casNo,
  //           groupName: lot.groupName,
  //           qty: lot.qty,
  //           price: totalPrice,
  //           unit: lot.unit,
  //           createdAt: new Date(),

  //           orderLotCutStock: inventoryLotUsed,
  //         };
  //         return orderlot;
  //       }
  //     }),
  //   );
  //   return data;
  // }
}
