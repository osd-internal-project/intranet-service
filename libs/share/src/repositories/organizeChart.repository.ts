import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizedChartRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.findMany();
  }

  async findFrist(
    condition: Prisma.organizedChartFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.findFirst(condition);
  }

  async findMany(
    condition: Prisma.organizedChartFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.findMany(condition);
  }
  async findOne(
    condition: Prisma.organizedChartFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.findFirst(condition);
  }
  async create(
    condition: Prisma.organizedChartCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.create(condition);
  }
  async createMany(
    data: Prisma.organizedChartCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.createMany(data);
  }
  async update(
    data: Prisma.organizedChartUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.update(data);
  }
  async delete(
    condition: Prisma.organizedChartDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.delete(condition);
  }
  async count(
    condition: Prisma.organizedChartCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.organizedChart.count(condition);
  }
}
