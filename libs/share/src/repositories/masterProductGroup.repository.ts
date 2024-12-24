import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.findMany();
  }
  async findMany(
    condition: Prisma.masterProductGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.findMany(condition);
  }
  async findFirst(
    condition: Prisma.masterProductGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.masterProductGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.create(condition);
  }
  async createMany(
    data: Prisma.masterProductGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.createMany(data);
  }
  async update(
    data: Prisma.masterProductGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.update(data);
  }
  async delete(
    condition: Prisma.masterProductGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroup.delete(condition);
  }
}
