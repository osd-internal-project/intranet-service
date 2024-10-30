import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectProductMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.findMany();
  }
  async findMany(
    condition: Prisma.customerProjectProductMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerProjectProductMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.findFirst(condition);
  }
  async create(
    condition: Prisma.customerProjectProductMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.create(condition);
  }
  async createMany(
    data: Prisma.customerProjectProductMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.createMany(data);
  }
  async update(
    data: Prisma.customerProjectProductMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.update(data);
  }
  async delete(
    condition: Prisma.customerProjectProductMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.delete(condition);
  }
  async count(
    condition: Prisma.customerProjectProductMapCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerProjectProductMapAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectProductMap.aggregate(condition);
  }
}
