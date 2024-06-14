import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserMapOrganizeGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.findMany();
  }
  async findMany(
    condition: Prisma.userMapOrganizeGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.findMany(condition);
  }
  async findOne(
    condition: Prisma.userMapOrganizeGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.userMapOrganizeGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.create(condition);
  }
  async createMany(
    data: Prisma.userMapOrganizeGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.createMany(data);
  }
  async update(
    data: Prisma.userMapOrganizeGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.update(data);
  }
  async delete(
    condition: Prisma.userMapOrganizeGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.delete(condition);
  }
  async deleteMany(
    condition: Prisma.userMapOrganizeGroupDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.deleteMany(condition);
  }
  async count(
    condition: Prisma.userMapOrganizeGroupCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroup.count(condition);
  }
}
