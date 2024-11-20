import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationLogsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.findMany();
  }
  async findMany(
    condition: Prisma.notiActionLogsFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.findMany(condition);
  }
  async findOne(
    condition: Prisma.notiActionLogsFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.findFirst(condition);
  }
  async create(
    condition: Prisma.notiActionLogsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.create(condition);
  }
  async createMany(
    data: Prisma.notiActionLogsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.createMany(data);
  }
  async update(
    data: Prisma.notiActionLogsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.update(data);
  }
  async delete(
    condition: Prisma.notiActionLogsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.delete(condition);
  }
  async count(
    condition: Prisma.notiActionLogsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notiActionLogs.count(condition);
  }
}
