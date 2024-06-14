import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class dataLeaveFilesRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(
    condition: Prisma.dataLeaveFilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.findMany(condition);
  }
  async findMany(
    condition: Prisma.dataLeaveFilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.findMany(condition);
  }
  async findOne(
    condition: Prisma.dataLeaveFilesFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.findFirst(condition);
  }
  async create(
    condition: Prisma.dataLeaveFilesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.create(condition);
  }
  async createMany(
    data: Prisma.dataLeaveFilesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.createMany(data);
  }
  async update(
    data: Prisma.dataLeaveFilesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.update(data);
  }
  async delete(
    condition: Prisma.dataLeaveFilesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.delete(condition);
  }
  async deleteMany(
    condition: Prisma.dataLeaveFilesDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.deleteMany(condition);
  }

  async count(
    condition: Prisma.dataLeaveFilesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.dataLeaveFiles.count(condition);
  }
}
