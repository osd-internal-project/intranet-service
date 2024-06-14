import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class PublicizeSlideImagesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.findMany();
  }
  async findMany(
    condition: Prisma.publicizeSlideImagesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.findMany(condition);
  }
  async findOne(
    condition: Prisma.publicizeSlideImagesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.findFirst(condition);
  }
  async create(
    condition: Prisma.publicizeSlideImagesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.create(condition);
  }
  async createMany(
    data: Prisma.publicizeSlideImagesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.createMany(data);
  }
  async update(
    data: Prisma.publicizeSlideImagesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.update(data);
  }
  async delete(
    condition: Prisma.publicizeSlideImagesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.delete(condition);
  }
  async count(
    condition: Prisma.publicizeSlideImagesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.publicizeSlideImages.count(condition);
  }
}
