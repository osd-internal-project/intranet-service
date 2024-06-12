import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterTypeLeaveMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.findMany();
  }
  async findMany(
    condition: Prisma.typeLeaveDisabledMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.typeLeaveDisabledMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.findFirst(condition);
  }
  async create(
    condition: Prisma.typeLeaveDisabledMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.create(condition);
  }
  async createMany(
    data: Prisma.typeLeaveDisabledMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.createMany(data);
  }
  async update(
    data: Prisma.typeLeaveDisabledMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.update(data);
  }
  async delete(
    condition: Prisma.typeLeaveDisabledMapDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.typeLeaveDisabledMap.deleteMany(condition);
  }
}
