import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class LogLeaveDataRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.findMany();
  }
  async findMany(
    condition: Prisma.LogLeaveDataFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.findMany(condition);
  }
  async findOne(
    condition: Prisma.LogLeaveDataFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.findFirst(condition);
  }
  async create(
    condition: Prisma.LogLeaveDataCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.create(condition);
  }
  async createMany(
    data: Prisma.LogLeaveDataCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.createMany(data);
  }
  async update(
    data: Prisma.LogLeaveDataUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.update(data);
  }
  async delete(
    condition: Prisma.LogLeaveDataDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.delete(condition);
  }
  async count(
    condition: Prisma.LogLeaveDataCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.logLeaveData.count(condition);
  }
}
