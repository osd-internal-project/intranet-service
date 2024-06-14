import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupUserRoleMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.findMany();
  }
  async findMany(
    condition: Prisma.userGroupUserRoleMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.userGroupUserRoleMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.findFirst(condition);
  }
  async create(
    condition: Prisma.userGroupUserRoleMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.create(condition);
  }
  async createMany(
    data: Prisma.userGroupUserRoleMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.createMany(data);
  }
  async update(
    data: Prisma.userGroupUserRoleMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.update(data);
  }
  async delete(
    condition: Prisma.userGroupUserRoleMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.delete(condition);
  }
  async deleteMany(
    condition: Prisma.userGroupUserRoleMapDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.deleteMany(condition);
  }
  async count(
    condition: Prisma.userGroupUserRoleMapCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupUserRoleMap.count(condition);
  }
}
