import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerFilesRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(
    condition: Prisma.customerFilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.findMany(condition);
  }
  async findMany(
    condition: Prisma.customerFilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerFilesFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.findFirst(condition);
  }
  async create(
    condition: Prisma.customerFilesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.create(condition);
  }
  async createMany(
    data: Prisma.customerFilesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.createMany(data);
  }
  async update(
    data: Prisma.customerFilesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.update(data);
  }
  async delete(
    condition: Prisma.customerFilesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.delete(condition);
  }
  async deleteMany(
    condition: Prisma.customerFilesDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.deleteMany(condition);
  }

  async count(
    condition: Prisma.customerFilesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerFiles.count(condition);
  }
}
