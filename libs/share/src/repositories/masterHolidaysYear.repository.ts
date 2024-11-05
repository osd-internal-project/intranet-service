import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterHolidaysYearRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.findMany();
  }
  async findMany(
    condition: Prisma.masterHolidaysYearFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterHolidaysYearFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.findFirst(condition);
  }
  async count(
    condition: Prisma.masterHolidaysYearCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.count(condition);
  }
  async create(
    condition: Prisma.masterHolidaysYearCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.create(condition);
  }
  async createMany(
    data: Prisma.masterHolidaysYearCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.createMany(data);
  }
  async update(
    data: Prisma.masterHolidaysYearUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.update(data);
  }
  async delete(
    condition: Prisma.masterHolidaysYearDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidaysYear.delete(condition);
  }
}
