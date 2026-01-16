import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class employeePropertyRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.findMany();
  }
  async findMany(
    condition: Prisma.employeePropertyFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.findMany(condition);
  }
  async findOne(
    condition: Prisma.employeePropertyFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.findFirst(condition);
  }
  async create(
    condition: Prisma.employeePropertyCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.create(condition);
  }
  async createMany(
    data: Prisma.employeePropertyCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.createMany(data);
  }
  async update(
    data: Prisma.employeePropertyUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.update(data);
  }
  async delete(
    condition: Prisma.employeePropertyDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.delete(condition);
  }
  async count(
    condition: Prisma.employeePropertyCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProperty.count(condition);
  }
}
