import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileRuleRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.findMany();
  }
  async findByCondition(
    condition: Prisma.profileRuleFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.findMany(condition);
  }
  async findOne(
    condition: Prisma.profileRuleFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.findFirst(condition);
  }
  async create(
    condition: Prisma.profileRuleCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.create(condition);
  }
  async createMany(
    data: Prisma.profileRuleCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.createMany(data);
  }
  async update(
    data: Prisma.profileRuleUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.update(data);
  }
  async delete(
    condition: Prisma.profileRuleDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.profileRule.delete(condition);
  }
}
