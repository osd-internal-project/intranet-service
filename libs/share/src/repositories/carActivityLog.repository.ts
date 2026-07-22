import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarActivityLogRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    condition: Prisma.carActivityLogCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.carActivityLog.create(condition);
  }
  async findMany(
    condition: Prisma.carActivityLogFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.carActivityLog.findMany(condition);
  }
  async count(
    condition: Prisma.carActivityLogCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.carActivityLog.count(condition);
  }
}
