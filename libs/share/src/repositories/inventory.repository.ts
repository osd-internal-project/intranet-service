import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(
    condition: Prisma.inventoryFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.findMany(condition);
  }
  async findMany(
    condition: Prisma.inventoryFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.findMany(condition);
  }
  async findOne(
    condition: Prisma.inventoryFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.findFirst(condition);
  }
  async create(
    condition: Prisma.inventoryCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.create(condition);
  }
  async createMany(
    data: Prisma.inventoryCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.createMany(data);
  }
  async update(
    data: Prisma.inventoryUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.update(data);
  }
  async delete(
    condition: Prisma.inventoryDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.delete(condition);
  }
  async deleteMany(
    condition: Prisma.inventoryDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.deleteMany(condition);
  }

  async count(
    condition: Prisma.inventoryCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.inventory.count(condition);
  }
}
