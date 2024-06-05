import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterTypeLeaveRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.findMany();
  }
  async findMany(
    condition: Prisma.masterTypeleaveFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterTypeleaveFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.findFirst(condition);
  }
  async create(
    condition: Prisma.masterTypeleaveCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.create(condition);
  }
  async createMany(
    data: Prisma.masterTypeleaveCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.createMany(data);
  }
  async update(
    data: Prisma.masterTypeleaveUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.update(data);
  }
  async delete(
    condition: Prisma.masterTypeleaveDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeleave.delete(condition);
  }
}
