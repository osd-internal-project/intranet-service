import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerBranchRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.findMany();
  }
  async findMany(
    condition: Prisma.customerBranchFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerBranchFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.findFirst(condition);
  }
  async create(
    condition: Prisma.customerBranchCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.create(condition);
  }
  async createMany(
    data: Prisma.customerBranchCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.createMany(data);
  }
  async update(
    data: Prisma.customerBranchUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.update(data);
  }
  async delete(
    condition: Prisma.customerBranchDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.delete(condition);
  }
  async count(
    condition: Prisma.customerBranchCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerBranchAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerBranch.aggregate(condition);
  }
}
