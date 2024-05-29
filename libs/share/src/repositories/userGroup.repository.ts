import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.findMany();
  }
  async findByCondition(
    condition: Prisma.userGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.findMany(condition);
  }
  async findOne(
    condition: Prisma.userGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.userGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.create(condition);
  }
  async createMany(
    data: Prisma.userGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.createMany(data);
  }
  async update(
    data: Prisma.userGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.update(data);
  }
  async updateMany(
    data: Prisma.userGroupUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.updateMany(data);
  }
  async delete(
    condition: Prisma.userGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userGroupDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroup.deleteMany(condition);
  }
}
