import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ImageGhsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.findMany();
  }
  async findMany(
    condition: Prisma.imagesGhsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.findMany(condition);
  }
  async findOne(
    condition: Prisma.imagesGhsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.findFirst(condition);
  }
  async create(
    condition: Prisma.imagesGhsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.create(condition);
  }
  async createMany(
    data: Prisma.imagesGhsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.createMany(data);
  }

  async createImagesLocation(
    data: Prisma.imagesGhsCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return await prisma.imagesGhs.createMany({
      data,
    });
  }

  async getFilesImageLocation(id: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return await prisma.imagesGhs.findMany({
      where: { imagesGhsId: id },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async update(
    condition: Prisma.imagesGhsUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.updateMany(condition);
  }

  async deleteMany(
    condition: Prisma.imagesGhsDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesGhs.deleteMany(condition);
  }
}
