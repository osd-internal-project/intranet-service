import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestOrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.findMany();
  }
  async findMany(
    condition: Prisma.requestOrderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.findMany(condition);
  }
  async findOne(
    condition: Prisma.requestOrderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.findFirst(condition);
  }
  async create(
    condition: Prisma.requestOrderCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.create(condition);
  }
  async createMany(
    data: Prisma.requestOrderCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.createMany(data);
  }
  async update(
    data: Prisma.requestOrderUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.update(data);
  }
  async delete(
    condition: Prisma.requestOrderDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.delete(condition);
  }
  async count(
    condition: Prisma.requestOrderCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.requestOrder.count(condition);
  }
}
