import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketExpendRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.findMany();
  }
  async findMany(
    condition: Prisma.ticketExpendFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.findMany(condition);
  }
  async findOne(
    condition: Prisma.ticketExpendFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.findFirst(condition);
  }
  async create(
    condition: Prisma.ticketExpendCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.create(condition);
  }
  async createMany(
    data: Prisma.ticketExpendCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.createMany(data);
  }
  async update(
    data: Prisma.ticketExpendUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.update(data);
  }
  async delete(
    condition: Prisma.ticketExpendDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpend.delete(condition);
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
