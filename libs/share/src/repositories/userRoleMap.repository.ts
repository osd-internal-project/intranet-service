import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRoleMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.findMany();
  }
  async findByCondition(
    condition: Prisma.userRoleMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.userRoleMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.findFirst(condition);
  }
  async create(
    condition: Prisma.userRoleMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.create(condition);
  }
  async createMany(
    data: Prisma.userRoleMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.createMany(data);
  }
  async update(
    data: Prisma.userRoleMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.update(data);
  }
  async delete(
    condition: Prisma.userRoleMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userRoleMapDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userRoleMap.deleteMany(condition);
  }
}
