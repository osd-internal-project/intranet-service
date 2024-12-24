import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterRefreshmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.findMany();
  }
  async findMany(
    condition: Prisma.masterRefreshmentFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterRefreshmentFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.findFirst(condition);
  }
  async create(
    condition: Prisma.masterRefreshmentCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.create(condition);
  }
  async createMany(
    data: Prisma.masterRefreshmentCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.createMany(data);
  }
  async update(
    data: Prisma.masterRefreshmentUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.update(data);
  }
  async delete(
    condition: Prisma.masterRefreshmentDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.delete(condition);
  }
  async count(
    condition: Prisma.masterRefreshmentCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRefreshment.count(condition);
  }
  // async aggregate(
  //   condition: Prisma.masterRefreshmentAggregateArgs,
  //   option?: { prisma?: TQueryClient },
  // ) {
  //   const prisma = option?.prisma ?? this.prisma;
  //   return prisma.masterRefreshment.aggregate(condition);
  // }
}
