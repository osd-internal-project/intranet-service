import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderLotRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.findMany();
  }
  async findMany(
    condition: Prisma.orderLotFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.findMany(condition);
  }
  async findOne(
    condition: Prisma.orderLotFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.findFirst(condition);
  }
  async create(
    condition: Prisma.orderLotCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.create(condition);
  }
  async createMany(
    data: Prisma.orderLotCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.createMany(data);
  }
  async update(
    data: Prisma.orderLotUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.update(data);
  }
  async delete(
    condition: Prisma.orderLotDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.delete(condition);
  }
  async count(
    condition: Prisma.orderLotCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.orderLot.count(condition);
  }
}
