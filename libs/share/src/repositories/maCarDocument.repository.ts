import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarDocumentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.findMany();
  }
  async findMany(
    condition: Prisma.maCarDocumentFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarDocumentFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarDocumentCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.create(condition);
  }
  async createMany(
    data: Prisma.maCarDocumentCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.createMany(data);
  }
  async update(
    data: Prisma.maCarDocumentUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.update(data);
  }
  async delete(
    condition: Prisma.maCarDocumentDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.delete(condition);
  }
  async count(
    condition: Prisma.maCarDocumentCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.count(condition);
  }
  async aggregate(
    condition: Prisma.MaCarDocumentAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocument.aggregate(condition);
  }
}
