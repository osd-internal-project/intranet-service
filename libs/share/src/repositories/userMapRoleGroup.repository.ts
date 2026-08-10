import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserMapRoleGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.findMany();
  }
  async findMany(
    condition: Prisma.userMapRoleGroupFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.findMany(condition);
  }
  async findOne(
    condition: Prisma.userMapRoleGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.userMapRoleGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.create(condition);
  }
  async createMany(
    data: Prisma.userMapRoleGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.createMany(data);
  }
  async update(
    data: Prisma.userMapRoleGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.update(data);
  }
  async delete(
    condition: Prisma.userMapRoleGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.delete(condition);
  }
  async deleteMany(
    condition: Prisma.userMapRoleGroupDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.deleteMany(condition);
  }
  async count(
    condition: Prisma.userMapRoleGroupCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapRoleGroup.count(condition);
  }
}
