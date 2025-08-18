import { Injectable } from '@nestjs/common';
import { RequestOrderRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { RequestOrderType } from './dto/create-request-order.dto';

@Injectable()
export class RequestOrderService {
  constructor(private readonly requestorderRepo: RequestOrderRepository) {}
  create(createRequestOrderDto: RequestOrderType) {
    const totalQty = createRequestOrderDto.requestList?.reduce(
      (acc, item) => acc + (item.qty ?? 0),
      0,
    );
    const totalPrice = createRequestOrderDto.requestList?.reduce(
      (acc, item) => acc + (item.amount ?? 0),
      0,
    );
    const data = {
      requester: createRequestOrderDto.requester,
      requestDate: createRequestOrderDto.requestDate,
      object: createRequestOrderDto.object,
      createdBy: createRequestOrderDto.createdBy,
      remark: createRequestOrderDto.remark,
      requestPrice: totalPrice ?? 0,
      requestQty: totalQty ?? 0,
      requestList: {
        create: createRequestOrderDto.requestList,
      },
    } as Prisma.requestOrderCreateInput;

    return this.requestorderRepo.create({ data: { ...data } });
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
      include: { requestList: { include: { masterProduct: true } } },
      skip,
      take,
    });
    const count = await this.requestorderRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(requestId: string) {
    const data = await this.requestorderRepo.findOne({
      where: { requestId: requestId },
      include: { requestList: { include: { masterProduct: true } } },
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
