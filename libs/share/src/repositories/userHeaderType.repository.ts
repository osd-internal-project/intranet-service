import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserHeaderTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.findMany();
  }
  async findByCondition(
    condition: Prisma.userHeaderTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.findMany(condition);
  }
  async findOne(
    condition: Prisma.userHeaderTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.findFirst(condition);
  }
  async create(
    condition: Prisma.userHeaderTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.create(condition);
  }
  async createMany(
    data: Prisma.userHeaderTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.createMany(data);
  }
  async update(
    data: Prisma.userHeaderTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.update(data);
  }
  async updateMany(
    data: Prisma.userHeaderTypeUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.updateMany(data);
  }
  async delete(
    condition: Prisma.userHeaderTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userHeaderTypeDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userHeaderType.deleteMany(condition);
  }
}
