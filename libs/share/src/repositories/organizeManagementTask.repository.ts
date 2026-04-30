import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class organizeManagementTaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.findMany();
  }
  async findMany(
    condition: Prisma.organizeManagementTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.findMany(condition);
  }
  async findOne(
    condition: Prisma.organizeManagementTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.findFirst(condition);
  }
  async create(
    condition: Prisma.organizeManagementTaskCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.create(condition);
  }
  async createMany(
    data: Prisma.organizeManagementTaskCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.createMany(data);
  }
  async update(
    data: Prisma.organizeManagementTaskUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.update(data);
  }
  async delete(
    condition: Prisma.organizeManagementTaskDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.delete(condition);
  }
  async deleteMany(
    condition: Prisma.organizeManagementTaskDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.deleteMany(condition);
  }
  async count(
    condition: Prisma.organizeManagementTaskCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.count(condition);
  }
  async aggregate(
    condition: Prisma.OrganizeManagementTaskAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagementTask.aggregate(condition);
  }
}
