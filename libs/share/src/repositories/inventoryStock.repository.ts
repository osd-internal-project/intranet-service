import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryStockRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.findMany();
  }
  async findMany(
    condition: Prisma.inventoryStockFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.findMany(condition);
  }
  async findOne(
    condition: Prisma.inventoryStockFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.findFirst(condition);
  }
  async create(
    condition: Prisma.inventoryStockCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.create(condition);
  }
  async createMany(
    data: Prisma.inventoryStockCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.createMany(data);
  }
  async update(
    data: Prisma.inventoryStockUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.update(data);
  }
  async updateMany(
    data: Prisma.inventoryStockUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.updateMany(data);
  }
  async delete(
    condition: Prisma.inventoryStockDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.delete(condition);
  }

  async count(
    condition: Prisma.inventoryStockCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.count(condition);
  }

  async aggregate(
    condition: Prisma.InventoryStockAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventoryStock.aggregate(condition);
  }
}
