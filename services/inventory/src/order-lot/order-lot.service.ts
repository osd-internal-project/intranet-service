import { Injectable } from '@nestjs/common';
import { CreateOrderLotDto } from './dto/create-order-lot.dto';
import { UpdateOrderLotDto } from './dto/update-order-lot.dto';
import { Prisma } from '@prisma/client';
import { OrderLotRepository } from '@inventory/share';
import dayjs from 'dayjs';

@Injectable()
export class OrderLotService {
  constructor(private readonly orderlotRepo: OrderLotRepository) {}
  create(createOrderLotDto: Prisma.orderLotCreateInput) {
    return this.orderlotRepo.create({ data: { ...createOrderLotDto } });
  }

  async findAll(query: Prisma.orderLotWhereInput, skip: number, take: number) {
    let filter = {};
    if (query.oderId) {
      filter = { ...filter, oderId: query.oderId };
    }
    if (query?.createdAt) {
      filter = {
        ...filter,
        createdAt: {
          gte: dayjs(query.createdAt as string)
            .startOf('date')
            .toDate(),
          lte: dayjs(query.createdAt as string)
            .endOf('date')
            .toDate(),
        },
      };
    }
    const data = await this.orderlotRepo.findMany({
      where: filter,
      skip,
      take,
    });
    const count = await this.orderlotRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(id: number) {
    const data = await this.orderlotRepo.findOne({
      where: { id },
    });
    return data;
  }

  update(id: number, updateOrderLotDto: Prisma.orderLotUpdateInput) {
    return this.orderlotRepo.update({
      where: { id },
      data: { ...updateOrderLotDto },
    });
  }

  remove(id: number) {
    return this.orderlotRepo.delete({ where: { id } });
  }
}
