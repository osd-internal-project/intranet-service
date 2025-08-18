import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestOrderListRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.findMany();
  }
  async findMany(
    condition: Prisma.requestOrderListFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.findMany(condition);
  }
  async findOne(
    condition: Prisma.requestOrderListFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.findFirst(condition);
  }
  async create(
    condition: Prisma.requestOrderListCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.create(condition);
  }
  async createMany(
    data: Prisma.requestOrderListCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.createMany(data);
  }
  async update(
    data: Prisma.requestOrderListUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.update(data);
  }
  async delete(
    condition: Prisma.requestOrderListDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.delete(condition);
  }
  async count(
    condition: Prisma.requestOrderListCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrderList.count(condition);
  }
}
