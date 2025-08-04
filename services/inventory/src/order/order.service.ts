import { OrderRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}
  create(createOrderDto: Prisma.orderCreateInput) {
    return this.orderRepo.create({ data: { ...createOrderDto } });
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

  async findOne(id: number) {
    const data = await this.orderRepo.findOne({
      where: { id: id },
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
