import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarDocumentFileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.findMany();
  }
  async findMany(
    condition: Prisma.maCarDocumentFileFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarDocumentFileFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarDocumentFileCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.create(condition);
  }
  async createMany(
    data: Prisma.maCarDocumentFileCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.createMany(data);
  }
  async update(
    data: Prisma.maCarDocumentFileUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.update(data);
  }
  async delete(
    condition: Prisma.maCarDocumentFileDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.delete(condition);
  }
  async count(
    condition: Prisma.maCarDocumentFileCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarDocumentFile.count(condition);
  }
}
