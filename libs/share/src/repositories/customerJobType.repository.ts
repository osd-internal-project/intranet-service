import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerJobTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.findMany();
  }
  async findMany(
    condition: Prisma.customerJobTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerJobTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.findFirst(condition);
  }
  async create(
    condition: Prisma.customerJobTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.create(condition);
  }
  async createMany(
    data: Prisma.customerJobTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.createMany(data);
  }
  async update(
    data: Prisma.customerJobTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.update(data);
  }
  async delete(
    condition: Prisma.customerJobTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.delete(condition);
  }
  async count(
    condition: Prisma.customerJobTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerJobTypeAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerJobType.aggregate(condition);
  }
}
