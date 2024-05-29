import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterActionStatusRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.findMany();
  }
  async findMany(
    condition: Prisma.masterActionStatusFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterActionStatusFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.findFirst(condition);
  }
  async create(
    condition: Prisma.masterActionStatusCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.create(condition);
  }
  async createMany(
    data: Prisma.masterActionStatusCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.createMany(data);
  }
  async update(
    data: Prisma.masterActionStatusUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.update(data);
  }
  async delete(
    condition: Prisma.masterActionStatusDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterActionStatus.delete(condition);
  }
}
