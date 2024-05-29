import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductCategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.findMany();
  }
  async findMany(
    condition: Prisma.masterProductCategoriesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterProductCategoriesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.findFirst(condition);
  }
  async create(
    condition: Prisma.masterProductCategoriesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.create(condition);
  }
  async createMany(
    data: Prisma.masterProductCategoriesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.createMany(data);
  }
  async update(
    data: Prisma.masterProductCategoriesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.update(data);
  }
  async delete(
    condition: Prisma.masterProductCategoriesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.delete(condition);
  }
  async count(
    condition: Prisma.masterProductCategoriesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductCategories.count(condition);
  }
}
