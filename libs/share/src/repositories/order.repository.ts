import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.findMany();
  }
  async findMany(
    condition: Prisma.orderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.findMany(condition);
  }
  async findOne(
    condition: Prisma.orderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.findFirst(condition);
  }
  async create(
    condition: Prisma.orderCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.create(condition);
  }
  async createMany(
    data: Prisma.orderCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.createMany(data);
  }
  async update(
    data: Prisma.orderUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.update(data);
  }
  async delete(
    condition: Prisma.orderDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.delete(condition);
  }
  async count(
    condition: Prisma.orderCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.order.count(condition);
  }
}
