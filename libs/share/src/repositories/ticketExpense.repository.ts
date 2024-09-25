import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketExpenseRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.findMany();
  }
  async findMany(
    condition: Prisma.ticketExpenseFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.findMany(condition);
  }
  async findOne(
    condition: Prisma.ticketExpenseFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.findFirst(condition);
  }
  async create(
    condition: Prisma.ticketExpenseCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.create(condition);
  }
  async createMany(
    data: Prisma.ticketExpenseCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.createMany(data);
  }
  async update(
    data: Prisma.ticketExpenseUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.update(data);
  }
  async delete(
    condition: Prisma.ticketExpenseDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketExpense.delete(condition);
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
