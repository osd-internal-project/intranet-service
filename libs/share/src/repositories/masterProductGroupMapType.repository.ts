import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductGroupMapTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.findMany();
  }
  async findMany(
    condition: Prisma.masterProductGroupMapTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterProductGroupMapTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.findFirst(condition);
  }
  async create(
    condition: Prisma.masterProductGroupMapTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.create(condition);
  }
  async createMany(
    data: Prisma.masterProductGroupMapTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.createMany(data);
  }
  async update(
    data: Prisma.masterProductGroupMapTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.update(data);
  }
  async delete(
    condition: Prisma.masterProductGroupMapTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProductGroupMapType.delete(condition);
  }
}
