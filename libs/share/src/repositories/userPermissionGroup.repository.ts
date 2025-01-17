import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPermissionGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.findMany();
  }
  async findMany(
    condition: Prisma.userPermissionGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.findMany(condition);
  }
  async findFirst(
    condition: Prisma.userPermissionGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.userPermissionGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.create(condition);
  }
  async createMany(
    data: Prisma.userPermissionGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.createMany(data);
  }
  async update(
    data: Prisma.userPermissionGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.update(data);
  }
  async updateMany(
    data: Prisma.userPermissionGroupUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.updateMany(data);
  }
  async delete(
    condition: Prisma.userPermissionGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userPermissionGroupDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionGroup.deleteMany(condition);
  }
}
