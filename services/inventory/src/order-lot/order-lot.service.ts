import { Injectable } from '@nestjs/common';
import { OrderLotRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderLotService {
  constructor(private orderLotRepo: OrderLotRepository) {}

  create(data: Prisma.orderLotCreateInput) {
    const condition = { data: data } as Prisma.orderLotCreateArgs;
    return this.orderLotRepo.create(condition);
  }

  findAll() {
    return this.orderLotRepo.findAll();
  }

  findByCondition(condition: Prisma.orderLotFindManyArgs) {
    condition = {
      ...condition,
    };
    return this.orderLotRepo.findMany(condition);
  }
  findOneByCondition(condition: Prisma.orderLotFindFirstArgs) {
    condition = {
      ...condition,
    };
    return this.orderLotRepo.findOne(condition);
  }
  async update(id: number, data: Prisma.orderLotUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.orderLotUpdateArgs;
    return await this.orderLotRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.orderLotDeleteArgs;
    return await this.orderLotRepo.delete(condition);
  }
}
