import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupMapHeaderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.findMany();
  }
  async findMany(
    condition: Prisma.userGroupMapHeaderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.findMany(condition);
  }
  async findFirst(
    condition: Prisma.userGroupMapHeaderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.findFirst(condition);
  }
  async create(
    condition: Prisma.userGroupMapHeaderCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.create(condition);
  }
  async createMany(
    data: Prisma.userGroupMapHeaderCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.createMany(data);
  }
  async update(
    data: Prisma.userGroupMapHeaderUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.update(data);
  }
  async updateMany(
    data: Prisma.userGroupMapHeaderUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.updateMany(data);
  }
  async delete(
    condition: Prisma.userGroupMapHeaderDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userGroupMapHeaderDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapHeader.deleteMany(condition);
  }
}
