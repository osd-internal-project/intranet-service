import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerPriorityRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.findMany();
  }
  async findMany(
    condition: Prisma.customerPriorityFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerPriorityFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.findFirst(condition);
  }
  async create(
    condition: Prisma.customerPriorityCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.create(condition);
  }
  async createMany(
    data: Prisma.customerPriorityCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.createMany(data);
  }
  async update(
    data: Prisma.customerPriorityUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.update(data);
  }
  async delete(
    condition: Prisma.customerPriorityDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.delete(condition);
  }
  async count(
    condition: Prisma.customerPriorityCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerPriorityAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerPriority.aggregate(condition);
  }
}
