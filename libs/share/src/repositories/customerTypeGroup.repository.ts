import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerTypeGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.findMany();
  }
  async findMany(
    condition: Prisma.customerTypeGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerTypeGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.customerTypeGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.create(condition);
  }
  async createMany(
    data: Prisma.customerTypeGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.createMany(data);
  }
  async update(
    data: Prisma.customerTypeGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.update(data);
  }
  async delete(
    condition: Prisma.customerTypeGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.delete(condition);
  }
  async count(
    condition: Prisma.customerTypeGroupCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerTypeGroupAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerTypeGroup.aggregate(condition);
  }
}
