import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerChannelTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.findMany();
  }
  async findMany(
    condition: Prisma.customerChannelTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerChannelTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.findFirst(condition);
  }
  async create(
    condition: Prisma.customerChannelTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.create(condition);
  }
  async createMany(
    data: Prisma.customerChannelTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.createMany(data);
  }
  async update(
    data: Prisma.customerChannelTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.update(data);
  }
  async delete(
    condition: Prisma.customerChannelTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.delete(condition);
  }
  async count(
    condition: Prisma.customerChannelTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerChannelTypeAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerChannelType.aggregate(condition);
  }
}
