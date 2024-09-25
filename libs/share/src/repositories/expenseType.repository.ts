import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpenseTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.findMany();
  }
  async findMany(
    condition: Prisma.expenseTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.findMany(condition);
  }
  async findOne(
    condition: Prisma.expenseTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.findFirst(condition);
  }
  async create(
    condition: Prisma.expenseTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.create(condition);
  }
  async createMany(
    data: Prisma.expenseTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.createMany(data);
  }
  async update(
    data: Prisma.expenseTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.update(data);
  }
  async delete(
    condition: Prisma.expenseTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.delete(condition);
  }
  async count(
    condition: Prisma.expenseTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.expenseType.count(condition);
  }
  async aggregate(
    condition: Prisma.InventoryLotAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryLot.aggregate(condition);
  }
}
