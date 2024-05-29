import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.findMany();
  }
  async findMany(
    condition: Prisma.transactionFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.findMany(condition);
  }
  async findOne(
    condition: Prisma.transactionFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.findFirst(condition);
  }
  async create(
    condition: Prisma.transactionCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.create(condition);
  }
  async createMany(
    data: Prisma.transactionCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.createMany(data);
  }
  async update(
    data: Prisma.transactionUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.update(data);
  }
  async updateMany(
    data: Prisma.transactionUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.updateMany(data);
  }
  async delete(
    condition: Prisma.transactionDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.delete(condition);
  }

  async count(
    condition: Prisma.transactionCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.count(condition);
  }
  async aggregate(
    condition: Prisma.TransactionAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.aggregate(condition);
  }
  async countstatus(
    condition: Prisma.transactionCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.transaction.count(condition);
  }
}
