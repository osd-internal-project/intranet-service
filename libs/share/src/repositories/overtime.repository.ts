import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class OverTimeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.overtime.findMany();
  }

  async findMany(
    condition: Prisma.overtimeFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.overtime.findMany(condition);
  }

  async findFirst(
    condition: Prisma.overtimeFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.overtime.findFirst(condition);
  }

  async create(
    condition: Prisma.overtimeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.overtime.createMany(condition);
  }
  async update(
    condition: Prisma.overtimeUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.overtime.updateMany(condition);
  }

  async deleteMany(
    condition: Prisma.overtimeDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.overtime.deleteMany(condition);
  }
}
