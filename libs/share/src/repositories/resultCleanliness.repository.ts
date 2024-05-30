import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ResultCleanlinessRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.findMany();
  }
  async findMany(
    condition: Prisma.resultCleanlinessFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.findMany(condition);
  }
  async findOne(
    condition: Prisma.resultCleanlinessFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.findFirst(condition);
  }
  async create(
    condition: Prisma.resultCleanlinessCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.create(condition);
  }
  async createMany(
    data: Prisma.resultCleanlinessCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.createMany(data);
  }
  async update(
    data: Prisma.resultCleanlinessUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.update(data);
  }
  async delete(
    condition: Prisma.resultCleanlinessDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.delete(condition);
  }
  async count(
    condition: Prisma.resultCleanlinessCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.resultCleanliness.count(condition);
  }
}
