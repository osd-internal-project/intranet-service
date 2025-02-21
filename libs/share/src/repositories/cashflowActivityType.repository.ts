import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowActivityTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.cashflowActivityTypeFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.findMany(condition);
  }
  async findMany(
    condition: Prisma.cashflowActivityTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.findMany(condition);
  }
  async findFirst(
    condition: Prisma.cashflowActivityTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.findFirst(condition);
  }
  async create(
    condition: Prisma.cashflowActivityTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.create(condition);
  }

  async createMany(
    data: Prisma.cashflowActivityTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.createMany(data);
  }
  async update(
    data: Prisma.cashflowActivityTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.update(data);
  }
  async delete(
    condition: Prisma.cashflowActivityTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.delete(condition);
  }
  async deleteMany(
    condition: Prisma.cashflowActivityTypeDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.deleteMany(condition);
  }

  async count(
    condition: Prisma.cashflowActivityTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowActivityType.count(condition);
  }
}
