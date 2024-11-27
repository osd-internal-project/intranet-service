import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class PersonalInformationsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.findMany();
  }
  async findMany(
    condition: Prisma.personalInformationsFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.findMany(condition);
  }
  async findOne(
    condition: Prisma.personalInformationsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.findFirst(condition);
  }
  async create(
    condition: Prisma.personalInformationsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.create(condition);
  }
  async createMany(
    data: Prisma.personalInformationsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.createMany(data);
  }
  async update(
    data: Prisma.personalInformationsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.update(data);
  }
  async delete(
    condition: Prisma.personalInformationsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.delete(condition);
  }
  async count(
    condition: Prisma.personalInformationsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.personalInformations.count(condition);
  }
}
