import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbookFileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.findMany();
  }
  async findMany(
    condition: Prisma.handbookFileFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.findMany(condition);
  }
  async findOne(
    condition: Prisma.handbookFileFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.findFirst(condition);
  }
  async create(
    condition: Prisma.handbookFileCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.create(condition);
  }
  async createMany(
    data: Prisma.handbookFileCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.createMany(data);
  }
  async update(
    data: Prisma.handbookFileUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.update(data);
  }
  async delete(
    condition: Prisma.handbookFileDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.delete(condition);
  }
  async count(
    condition: Prisma.handbookFileCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbookFile.count(condition);
  }
}
