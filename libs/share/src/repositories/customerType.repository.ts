import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.findMany();
  }
  async findMany(
    condition: Prisma.customerTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.findFirst(condition);
  }
  async create(
    condition: Prisma.customerTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.create(condition);
  }
  async createMany(
    data: Prisma.customerTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.createMany(data);
  }
  async update(
    data: Prisma.customerTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.update(data);
  }
  async delete(
    condition: Prisma.customerTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.delete(condition);
  }
  async count(
    condition: Prisma.customerTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerTypeAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerType.aggregate(condition);
  }
}
