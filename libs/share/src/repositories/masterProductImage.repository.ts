import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductImageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.findMany();
  }
  async findMany(
    condition: Prisma.masterProductImageFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterProductImageFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.findFirst(condition);
  }
  async create(
    condition: Prisma.masterProductImageCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.create(condition);
  }
  async createMany(
    data: Prisma.masterProductImageCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.createMany(data);
  }
  async update(
    data: Prisma.masterProductImageUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.update(data);
  }
  async delete(
    condition: Prisma.masterProductImageDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.delete(condition);
  }
  async count(
    condition: Prisma.masterProductImageCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductImage.count(condition);
  }
}
