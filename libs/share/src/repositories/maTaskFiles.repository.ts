import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaTaskFilesRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(
    condition: Prisma.maTaskFilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.findMany(condition);
  }
  async findMany(
    condition: Prisma.maTaskFilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.findMany(condition);
  }
  async findOne(
    condition: Prisma.maTaskFilesFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.findFirst(condition);
  }
  async create(
    condition: Prisma.maTaskFilesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.create(condition);
  }
  async createMany(
    data: Prisma.maTaskFilesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.createMany(data);
  }
  async update(
    data: Prisma.maTaskFilesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.update(data);
  }
  async delete(
    condition: Prisma.maTaskFilesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.delete(condition);
  }
  async deleteMany(
    condition: Prisma.maTaskFilesDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.deleteMany(condition);
  }

  async count(
    condition: Prisma.maTaskFilesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maTaskFiles.count(condition);
  }
}
