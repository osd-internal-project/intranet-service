import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowSaleCyclesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.cashflowSaleCyclesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.findMany(condition);
  }
  async findMany(
    condition: Prisma.cashflowSaleCyclesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.findMany(condition);
  }
  async findFirst(
    condition: Prisma.cashflowSaleCyclesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.findFirst(condition);
  }
  async create(
    condition: Prisma.cashflowSaleCyclesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.create(condition);
  }

  async createMany(
    data: Prisma.cashflowSaleCyclesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.createMany(data);
  }
  async update(
    data: Prisma.cashflowSaleCyclesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.update(data);
  }
  async delete(
    condition: Prisma.cashflowSaleCyclesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.delete(condition);
  }
  async deleteMany(
    condition: Prisma.cashflowSaleCyclesDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.deleteMany(condition);
  }

  async count(
    condition: Prisma.cashflowSaleCyclesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowSaleCycles.count(condition);
  }
}
