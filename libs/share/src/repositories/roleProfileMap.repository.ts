import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleProfileMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.findMany();
  }
  async findByCondition(
    condition: Prisma.roleProfileMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.roleProfileMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.findFirst(condition);
  }
  async create(
    condition: Prisma.roleProfileMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.create(condition);
  }
  async createMany(
    data: Prisma.roleProfileMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.createMany(data);
  }
  async update(
    data: Prisma.roleProfileMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.update(data);
  }
  async delete(
    condition: Prisma.roleProfileMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.delete(condition);
  }

  async deleteMany(
    condition: Prisma.roleProfileMapDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.roleProfileMap.deleteMany(condition);
  }
}
