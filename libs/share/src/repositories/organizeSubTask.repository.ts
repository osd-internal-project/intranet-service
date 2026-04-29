import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class organizeSubTaskRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.findMany();
  }
  async findMany(
    condition: Prisma.organizeSubTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.findMany(condition);
  }
  async findOne(
    condition: Prisma.organizeSubTaskFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.findFirst(condition);
  }
  async create(
    condition: Prisma.organizeSubTaskCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.create(condition);
  }
  async createMany(
    data: Prisma.organizeSubTaskCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.createMany(data);
  }
  async update(
    data: Prisma.organizeSubTaskUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.update(data);
  }
  async delete(
    condition: Prisma.organizeSubTaskDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.delete(condition);
  }
  async deleteMany(
    condition: Prisma.organizeSubTaskDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.deleteMany(condition);
  }
  async count(
    condition: Prisma.organizeSubTaskCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.count(condition);
  }
  async aggregate(
    condition: Prisma.OrganizeSubTaskAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeSubTask.aggregate(condition);
  }
}
