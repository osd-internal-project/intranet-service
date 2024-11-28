import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class FamilyInformationsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.findMany();
  }
  async findMany(
    condition: Prisma.familyInformationsFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.findMany(condition);
  }
  async findOne(
    condition: Prisma.familyInformationsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.findFirst(condition);
  }
  async create(
    condition: Prisma.familyInformationsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.create(condition);
  }
  async createMany(
    data: Prisma.familyInformationsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.createMany(data);
  }
  async update(
    data: Prisma.familyInformationsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.update(data);
  }
  async delete(
    condition: Prisma.familyInformationsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.delete(condition);
  }
  async count(
    condition: Prisma.familyInformationsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.familyInformations.count(condition);
  }
}
