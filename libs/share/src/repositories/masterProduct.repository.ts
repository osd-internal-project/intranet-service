import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.findMany();
  }
  async findMany(
    condition: Prisma.masterProductFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.findMany(condition);
  }
  async findFirst(
    condition: Prisma.masterProductFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.findFirst(condition);
  }
  async create(
    condition: Prisma.masterProductCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.create(condition);
  }
  async createMany(
    data: Prisma.masterProductCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.createMany(data);
  }
  async update(
    data: Prisma.masterProductUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.update(data);
  }
  async delete(
    condition: Prisma.masterProductDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.delete(condition);
  }
  async count(
    condition: Prisma.masterProductCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProduct.count(condition);
  }
}
