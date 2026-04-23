import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class organizeTaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.findMany();
  }
  async findMany(
    condition: Prisma.organizeTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.findMany(condition);
  }
  async findOne(
    condition: Prisma.organizeTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.findFirst(condition);
  }
  async create(
    condition: Prisma.organizeTaskCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.create(condition);
  }
  async createMany(
    data: Prisma.organizeTaskCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.createMany(data);
  }
  async update(
    data: Prisma.organizeTaskUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.update(data);
  }
  async delete(
    condition: Prisma.organizeTaskDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.delete(condition);
  }
  async count(
    condition: Prisma.organizeTaskCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.count(condition);
  }
  async aggregate(
    condition: Prisma.OrganizeTaskAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeTask.aggregate(condition);
  }
}
