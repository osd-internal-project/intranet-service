import { Injectable } from '@nestjs/common';
import { RequestOrderRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class RequestOrderService {
  constructor(private readonly requestorderRepo: RequestOrderRepository) {}
  create(createRequestOrderDto: Prisma.requestOrderCreateInput) {
    return this.requestorderRepo.create({ data: { ...createRequestOrderDto } });
  }

  async findAll(
    query: Prisma.requestOrderWhereInput,
    skip: number,
    take: number,
  ) {
    let filter = {};
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
    const data = await this.requestorderRepo.findMany({
      where: filter,
      skip,
      take,
    });
    const count = await this.requestorderRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(requestId: string) {
    const data = await this.requestorderRepo.findOne({
      where: { requestId: requestId },
    });
    return data;
  }

  update(id: number, updateRequestOrderDto: Prisma.requestOrderUpdateInput) {
    return this.requestorderRepo.update({
      where: { id },
      data: { ...updateRequestOrderDto },
    });
  }

  remove(id: number) {
    return this.requestorderRepo.delete({ where: { id } });
  }
}
