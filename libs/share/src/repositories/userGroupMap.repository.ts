import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.findMany();
  }
  async findByCondition(
    condition: Prisma.userGroupMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.userGroupMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.findFirst(condition);
  }
  async create(
    condition: Prisma.userGroupMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.create(condition);
  }
  async createMany(
    data: Prisma.userGroupMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.createMany(data);
  }
  async update(
    data: Prisma.userGroupMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.update(data);
  }
  async updateMany(
    data: Prisma.userGroupMapUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.updateMany(data);
  }
  async delete(
    condition: Prisma.userGroupMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userGroupMapDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMap.deleteMany(condition);
  }
}
