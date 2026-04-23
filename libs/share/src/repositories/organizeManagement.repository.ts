import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class organizeManagementRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.findMany();
  }
  async findMany(
    condition: Prisma.organizeManagementFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.findMany(condition);
  }
  async findOne(
    condition: Prisma.organizeManagementFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.findFirst(condition);
  }
  async create(
    condition: Prisma.organizeManagementCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.create(condition);
  }
  async createMany(
    data: Prisma.organizeManagementCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.createMany(data);
  }
  async update(
    data: Prisma.organizeManagementUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.update(data);
  }
  async delete(
    condition: Prisma.organizeManagementDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.delete(condition);
  }
  async count(
    condition: Prisma.organizeManagementCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.count(condition);
  }
  async aggregate(
    condition: Prisma.OrganizeManagementAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizeManagement.aggregate(condition);
  }
}
