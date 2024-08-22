import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbooktypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.findMany();
  }
  async findMany(
    condition: Prisma.handbooktypeFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.findMany(condition);
  }
  async findOne(
    condition: Prisma.handbooktypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.findFirst(condition);
  }
  async create(
    condition: Prisma.handbooktypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.create(condition);
  }
  async createMany(
    data: Prisma.handbooktypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.createMany(data);
  }
  async update(
    data: Prisma.handbooktypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.update(data);
  }
  async delete(
    condition: Prisma.handbooktypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.delete(condition);
  }
  async count(
    condition: Prisma.handbooktypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.handbooktype.count(condition);
  }
}
