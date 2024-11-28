import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class EducationInformationsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.findMany();
  }
  async findMany(
    condition: Prisma.educationInformationsFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.findMany(condition);
  }
  async findOne(
    condition: Prisma.educationInformationsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.findFirst(condition);
  }
  async create(
    condition: Prisma.educationInformationsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.create(condition);
  }
  async createMany(
    data: Prisma.educationInformationsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.createMany(data);
  }
  async update(
    data: Prisma.educationInformationsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.update(data);
  }
  async delete(
    condition: Prisma.educationInformationsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.delete(condition);
  }
  async count(
    condition: Prisma.educationInformationsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.educationInformations.count(condition);
  }
}
