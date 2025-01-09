import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPermissionTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.findMany();
  }
  async findMany(
    condition: Prisma.userPermissionTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.findMany(condition);
  }
  async findFirst(
    condition: Prisma.userPermissionTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.findFirst(condition);
  }
  async create(
    condition: Prisma.userPermissionTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.create(condition);
  }
  async createMany(
    data: Prisma.userPermissionTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.createMany(data);
  }
  async update(
    data: Prisma.userPermissionTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.update(data);
  }
  async updateMany(
    data: Prisma.userPermissionTypeUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.updateMany(data);
  }
  async delete(
    condition: Prisma.userPermissionTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userPermissionTypeDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userPermissionType.deleteMany(condition);
  }
}
