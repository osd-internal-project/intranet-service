import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerDetailSubRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.findMany();
  }
  async findMany(
    condition: Prisma.customerDetailSubFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerDetailSubFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.findFirst(condition);
  }
  async create(
    condition: Prisma.customerDetailSubCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.create(condition);
  }
  async createMany(
    data: Prisma.customerDetailSubCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.createMany(data);
  }
  async update(
    data: Prisma.customerDetailSubUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.update(data);
  }
  async delete(
    condition: Prisma.customerDetailSubDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.delete(condition);
  }
  async count(
    condition: Prisma.customerDetailSubCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerDetailSubAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetailSub.aggregate(condition);
  }
}
