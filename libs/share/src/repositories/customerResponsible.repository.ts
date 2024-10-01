import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerResponsibleRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.findMany();
  }
  async findMany(
    condition: Prisma.customerResponsibleFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerResponsibleFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.findFirst(condition);
  }
  async create(
    condition: Prisma.customerResponsibleCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.create(condition);
  }
  async createMany(
    data: Prisma.customerResponsibleCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.createMany(data);
  }
  async update(
    data: Prisma.customerResponsibleUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.update(data);
  }
  async delete(
    condition: Prisma.customerResponsibleDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.delete(condition);
  }
  async count(
    condition: Prisma.customerResponsibleCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerResponsibleAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerResponsible.aggregate(condition);
  }
}
