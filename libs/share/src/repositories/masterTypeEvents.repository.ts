import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class masterTypeEventsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.findMany();
  }
  async findMany(
    condition: Prisma.masterTypeEventsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterTypeEventsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.findFirst(condition);
  }
  async create(
    condition: Prisma.masterTypeEventsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.create(condition);
  }
  async createMany(
    data: Prisma.masterTypeEventsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.createMany(data);
  }
  async update(
    data: Prisma.masterTypeEventsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.update(data);
  }
  async delete(
    condition: Prisma.masterTypeEventsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.delete(condition);
  }
  async count(
    condition: Prisma.masterTypeEventsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.count(condition);
  }
  async aggregate(
    condition: Prisma.MasterTypeEventsAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterTypeEvents.aggregate(condition);
  }
}
