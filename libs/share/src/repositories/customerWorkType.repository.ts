import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerWorkTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.findMany();
  }
  async findMany(
    condition: Prisma.customerWorkTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerWorkTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.findFirst(condition);
  }
  async create(
    condition: Prisma.customerWorkTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.create(condition);
  }
  async createMany(
    data: Prisma.customerWorkTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.createMany(data);
  }
  async update(
    data: Prisma.customerWorkTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.update(data);
  }
  async delete(
    condition: Prisma.customerWorkTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerWorkType.delete(condition);
  }
  async count(
    condition: Prisma.inventoryLotCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryLot.count(condition);
  }
  async aggregate(
    condition: Prisma.InventoryLotAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryLot.aggregate(condition);
  }
}
