import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerDetailRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.findMany();
  }
  async findMany(
    condition: Prisma.customerDetailFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerDetailFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.findFirst(condition);
  }
  async create(
    condition: Prisma.customerDetailCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.create(condition);
  }
  async createMany(
    data: Prisma.customerDetailCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.createMany(data);
  }
  async update(
    data: Prisma.customerDetailUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.update(data);
  }
  async delete(
    condition: Prisma.customerDetailDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.delete(condition);
  }
  async count(
    condition: Prisma.customerDetailCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerDetailAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerDetail.aggregate(condition);
  }
}
