import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.cashflowTypeFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.findMany(condition);
  }
  async findMany(
    condition: Prisma.cashflowTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.findMany(condition);
  }
  async findFirst(
    condition: Prisma.cashflowTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.findFirst(condition);
  }
  async create(
    condition: Prisma.cashflowTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.create(condition);
  }

  async createMany(
    data: Prisma.cashflowTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.createMany(data);
  }
  async update(
    data: Prisma.cashflowTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.update(data);
  }
  async delete(
    condition: Prisma.cashflowTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.delete(condition);
  }
  async deleteMany(
    condition: Prisma.cashflowTypeDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.deleteMany(condition);
  }

  async count(
    condition: Prisma.cashflowTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.cashflowType.count(condition);
  }
}
