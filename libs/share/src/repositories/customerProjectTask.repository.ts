import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectTaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.findMany();
  }
  async findMany(
    condition: Prisma.customerProjectTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerProjectTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.findFirst(condition);
  }
  async create(
    condition: Prisma.customerProjectTaskCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.create(condition);
  }
  async createMany(
    data: Prisma.customerProjectTaskCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.createMany(data);
  }
  async update(
    data: Prisma.customerProjectTaskUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.update(data);
  }
  async delete(
    condition: Prisma.customerProjectTaskDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.delete(condition);
  }
  async count(
    condition: Prisma.customerProjectTaskCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerProjectTaskAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTask.aggregate(condition);
  }
}
