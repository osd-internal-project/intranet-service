import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExperienceInformationsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.findMany();
  }
  async findMany(
    condition: Prisma.experienceInformationsFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.findMany(condition);
  }
  async findOne(
    condition: Prisma.experienceInformationsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.findFirst(condition);
  }
  async create(
    condition: Prisma.experienceInformationsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.create(condition);
  }
  async createMany(
    data: Prisma.experienceInformationsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.createMany(data);
  }
  async update(
    data: Prisma.experienceInformationsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.update(data);
  }
  async delete(
    condition: Prisma.experienceInformationsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.delete(condition);
  }
  async count(
    condition: Prisma.experienceInformationsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.experienceInformations.count(condition);
  }
}
