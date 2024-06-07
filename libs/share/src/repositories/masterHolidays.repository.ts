import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterHolidaysRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.findMany();
  }
  async findMany(
    condition: Prisma.masterHolidaysFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterHolidaysFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.findFirst(condition);
  }
  async create(
    condition: Prisma.masterHolidaysCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.create(condition);
  }
  async createMany(
    data: Prisma.masterHolidaysCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.createMany(data);
  }
  async update(
    data: Prisma.masterHolidaysUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.update(data);
  }
  async delete(
    condition: Prisma.masterHolidaysDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterHolidays.delete(condition);
  }
}
