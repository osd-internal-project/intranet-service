import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarFuelTransactionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.findMany();
  }
  async findMany(
    condition: Prisma.maCarFuelTransactionFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarFuelTransactionFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarFuelTransactionCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.create(condition);
  }
  async createMany(
    data: Prisma.maCarFuelTransactionCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.createMany(data);
  }
  async update(
    data: Prisma.maCarFuelTransactionUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.update(data);
  }
  async delete(
    condition: Prisma.maCarFuelTransactionDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.delete(condition);
  }
  async count(
    condition: Prisma.maCarFuelTransactionCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarFuelTransaction.count(condition);
  }
}
