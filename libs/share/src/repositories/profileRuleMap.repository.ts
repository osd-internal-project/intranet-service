import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileRuleMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.findMany();
  }
  async findByCondition(
    condition: Prisma.profileRuleMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.profileRuleMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.findFirst(condition);
  }
  async create(
    condition: Prisma.profileRuleMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.create(condition);
  }
  async createMany(
    data: Prisma.profileRuleMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.createMany(data);
  }
  async update(
    data: Prisma.profileRuleMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.update(data);
  }
  async delete(
    condition: Prisma.profileRuleMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.delete(condition);
  }

  async deleteMany(
    condition: Prisma.profileRuleMapDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRuleMap.deleteMany(condition);
  }
}
