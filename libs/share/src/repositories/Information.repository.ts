import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class InformationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.findMany();
  }
  async findMany(
    condition: Prisma.informationNewsFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.findMany(condition);
  }
  async findOne(
    condition: Prisma.informationNewsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.findFirst(condition);
  }
  async create(
    condition: Prisma.informationNewsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.create(condition);
  }
  async createMany(
    data: Prisma.informationNewsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.createMany(data);
  }
  async update(
    data: Prisma.informationNewsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.update(data);
  }
  async delete(
    condition: Prisma.informationNewsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.delete(condition);
  }
  async count(
    condition: Prisma.informationNewsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.informationNews.count(condition);
  }
}
