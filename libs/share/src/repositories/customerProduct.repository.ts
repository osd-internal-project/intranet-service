import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.findMany();
  }
  async findMany(
    condition: Prisma.customerProductFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerProductFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.findFirst(condition);
  }
  async create(
    condition: Prisma.customerProductCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.create(condition);
  }
  async createMany(
    data: Prisma.customerProductCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.createMany(data);
  }
  async update(
    data: Prisma.customerProductUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.update(data);
  }
  async delete(
    condition: Prisma.customerProductDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.delete(condition);
  }
  async count(
    condition: Prisma.customerProductCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerProductAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProduct.aggregate(condition);
  }
}
