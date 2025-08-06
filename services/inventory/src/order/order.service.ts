import { OrderLotRepository, OrderRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderlotRepo: OrderLotRepository,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const data = {
      prdId: createOrderDto.prdId,
      prdName: createOrderDto.prdName,
      price: createOrderDto.price,
      unit: createOrderDto.unit,
      totalQty: createOrderDto.totalQty,
      totalPrice: createOrderDto.totalPrice,
      expiredAt: createOrderDto.expiredAt.toString(),
      updatedBy: createOrderDto.updatedBy,
      status: 'in-stock',
    };
    const response = await this.orderRepo.create({ data: { ...data } });
    if (response) {
      if (createOrderDto.orderLot.length > 0) {
        createOrderDto.orderLot.map(async (e) => {
          return await this.orderlotRepo.create({
            data: {
              prdId: createOrderDto.prdId,
              prdName: createOrderDto.prdName,
              price: e.price,
              unit: e.unit,
              expiredAt: e.expiredAt,
              updatedBy: createOrderDto.updatedBy,
              barcode: e.barcode,
              oderId: response.oderId,
              status: 'in-stock',
            },
          });
        });
      }
    }

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
      include: {
        orderLot: true,
      },
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
