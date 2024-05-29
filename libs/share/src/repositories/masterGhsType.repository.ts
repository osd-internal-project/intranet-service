import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterGhsTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.masterGhsTypeFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.findMany(condition);
  }
  async findMany(
    condition: Prisma.masterGhsTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterGhsTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.findFirst(condition);
  }
  async create(
    condition: Prisma.masterGhsTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.create(condition);
  }
  async createMany(
    data: Prisma.masterGhsTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.createMany(data);
  }
  async update(
    data: Prisma.masterGhsTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.update(data);
  }
  async delete(
    condition: Prisma.masterGhsTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterGhsType.delete(condition);
  }
}
