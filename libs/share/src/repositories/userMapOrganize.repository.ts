import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserMapOrganizeChartRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.findMany();
  }
  async findMany(
    condition: Prisma.userMapOrganizeChartFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.findMany(condition);
  }
  async findOne(
    condition: Prisma.userMapOrganizeChartFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.findFirst(condition);
  }
  async create(
    condition: Prisma.userMapOrganizeChartCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.create(condition);
  }
  async createMany(
    data: Prisma.userMapOrganizeChartCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.createMany(data);
  }
  async update(
    data: Prisma.userMapOrganizeChartUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.update(data);
  }
  async delete(
    condition: Prisma.userMapOrganizeChartDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.delete(condition);
  }
  async deleteMany(
    condition: Prisma.userMapOrganizeChartDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.deleteMany(condition);
  }
  async count(
    condition: Prisma.userMapOrganizeChartCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeChart.count(condition);
  }
}
