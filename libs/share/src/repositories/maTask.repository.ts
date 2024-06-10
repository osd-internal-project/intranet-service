import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaTaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.findMany();
  }
  async findMany(
    condition: Prisma.maTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.findMany(condition);
  }
  async findOne(
    condition: Prisma.maTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.findFirst(condition);
  }
  async create(
    condition: Prisma.maTaskCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.create(condition);
  }
  async createMany(
    data: Prisma.maTaskCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.createMany(data);
  }
  async update(
    data: Prisma.maTaskUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.update(data);
  }
  async delete(
    condition: Prisma.maTaskDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.delete(condition);
  }
  async count(
    condition: Prisma.maTaskCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.count(condition);
  }
  async aggregate(
    condition: Prisma.MaTaskAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTask.aggregate(condition);
  }
}
