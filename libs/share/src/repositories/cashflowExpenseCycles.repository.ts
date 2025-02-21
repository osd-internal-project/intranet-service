import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowExpenseCyclesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.cashflowExpenseCyclesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.findMany(condition);
  }
  async findMany(
    condition: Prisma.cashflowExpenseCyclesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.findMany(condition);
  }
  async findFirst(
    condition: Prisma.cashflowExpenseCyclesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.findFirst(condition);
  }
  async create(
    condition: Prisma.cashflowExpenseCyclesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.create(condition);
  }

  async createMany(
    data: Prisma.cashflowExpenseCyclesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.createMany(data);
  }
  async update(
    data: Prisma.cashflowExpenseCyclesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.update(data);
  }
  async delete(
    condition: Prisma.cashflowExpenseCyclesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.delete(condition);
  }
  async deleteMany(
    condition: Prisma.contactDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.deleteMany(condition);
  }

  async count(
    condition: Prisma.cashflowExpenseCyclesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowExpenseCycles.count(condition);
  }
}
