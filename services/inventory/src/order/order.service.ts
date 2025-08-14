import { MasterProductRepository, OrderRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly masterproductRepo: MasterProductRepository,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const findMasterProduct = await this.masterproductRepo.findOne({
      where: { prdId: createOrderDto.prdId },
    });
    if (findMasterProduct) {
      await this.masterproductRepo.update({
        where: { prdId: createOrderDto.prdId },
        data: {
          totalQty: createOrderDto.totalQty + findMasterProduct.totalQty,
        },
      });
    }
    const data = {
      prdId: createOrderDto.prdId,
      prdName: createOrderDto.prdName,
      price: createOrderDto.price,
      unit: createOrderDto.unit,
      totalQty: createOrderDto.totalQty,
      totalPrice: createOrderDto.totalPrice,
      updatedBy: createOrderDto.updatedBy,
      cost: createOrderDto.cost,
      avgCost: createOrderDto.avgCost,
      status: 'in-stock',
      masterProduct: {
        connect: {
          prdId: createOrderDto.prdId,
        },
      },
    } as Prisma.orderCreateInput;
    const response = await this.orderRepo.create({ data: { ...data } });
    // if (response) {
    //   if (createOrderDto.orderLot.length > 0) {
    //     createOrderDto.orderLot.map(async (e) => {
    //       return await this.orderlotRepo.create({
    //         data: {
    //           prdId: createOrderDto.prdId,
    //           prdName: createOrderDto.prdName,
    //           price: e.price,
    //           unit: e.unit,
    //           cost: createOrderDto.cost,
    //           avgCost: createOrderDto.avgCost,
    //           expiredAt: e.expiredAt,
    //           updatedBy: createOrderDto.updatedBy,
    //           barcode: e.barcode,
    //           oderId: response.oderId,
    //           status: 'in-stock',
    //         },
    //       });
    //     });
    //   }
    // }

    return response;
  }

  async findAll(query: Prisma.orderWhereInput, skip: number, take: number) {
    const filter = {};
    const data = await this.orderRepo.findMany({
      where: filter,
      skip,
      take,
    });
    const count = await this.orderRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(id: string) {
    const data = await this.orderRepo.findOne({
      where: { oderId: id },
    });

    return data;
  }

  update(id: number, updateOrderDto: Prisma.orderUpdateInput) {
    return this.orderRepo.update({
      where: { id },
      data: { ...updateOrderDto },
    });
  }

  remove(id: number) {
    return this.orderRepo.delete({ where: { id } });
  }
}
