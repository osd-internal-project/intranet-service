import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterConfigTimeOtRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterDataConfigTimeOT.findMany();
  }

  async findMany(
    condition: Prisma.masterDataConfigTimeOTFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterDataConfigTimeOT.findMany(condition);
  }

  async findFirst(
    condition: Prisma.masterDataConfigTimeOTFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterDataConfigTimeOT.findFirst(condition);
  }

  async create(
    condition: Prisma.masterDataConfigTimeOTCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterDataConfigTimeOT.createMany(condition);
  }
  async update(
    condition: Prisma.masterDataConfigTimeOTUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterDataConfigTimeOT.updateMany(condition);
  }

  async deleteMany(
    condition: Prisma.masterDataConfigTimeOTDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterDataConfigTimeOT.deleteMany(condition);
  }
}
