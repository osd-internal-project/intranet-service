import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectTicketRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.findMany();
  }
  async findMany(
    condition: Prisma.customerProjectTicketFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerProjectTicketFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.findFirst(condition);
  }
  async create(
    condition: Prisma.customerProjectTicketCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.create(condition);
  }
  async createMany(
    data: Prisma.customerProjectTicketCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.createMany(data);
  }
  async update(
    data: Prisma.customerProjectTicketUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.update(data);
  }
  async delete(
    condition: Prisma.customerProjectTicketDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.delete(condition);
  }
  async count(
    condition: Prisma.customerProjectTicketCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerProjectTicketAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerProjectTicket.aggregate(condition);
  }
}
