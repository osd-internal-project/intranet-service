import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class DataLeaveRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.floor.findMany();
  }
  async findMany(
    condition: Prisma.dataLeaveFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.findMany(condition);
  }
  async findOne(
    condition: Prisma.dataLeaveFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.findFirst(condition);
  }
  async create(
    condition: Prisma.dataLeaveCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.create(condition);
  }
  async createMany(
    data: Prisma.dataLeaveCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.createMany(data);
  }
  async update(
    data: Prisma.dataLeaveUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.update(data);
  }
  async delete(
    condition: Prisma.dataLeaveDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.delete(condition);
  }
  async count(
    condition: Prisma.dataLeaveCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeave.count(condition);
  }
}
