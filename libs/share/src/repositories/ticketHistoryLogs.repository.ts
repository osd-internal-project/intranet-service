import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketHistoryLogsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.findMany();
  }
  async findMany(
    condition: Prisma.ticketHistoryLogsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.findMany(condition);
  }
  async findOne(
    condition: Prisma.ticketHistoryLogsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.findFirst(condition);
  }
  async create(
    condition: Prisma.ticketHistoryLogsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.create(condition);
  }
  async createMany(
    data: Prisma.ticketHistoryLogsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.createMany(data);
  }
  async update(
    data: Prisma.ticketHistoryLogsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.update(data);
  }
  async delete(
    condition: Prisma.ticketHistoryLogsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.delete(condition);
  }
  async count(
    condition: Prisma.ticketHistoryLogsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.count(condition);
  }
  async aggregate(
    condition: Prisma.TicketHistoryLogsAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.ticketHistoryLogs.aggregate(condition);
  }
}
