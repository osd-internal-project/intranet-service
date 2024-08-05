import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class newsImageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.findMany();
  }
  async findMany(
    condition: Prisma.newsImageFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.findMany(condition);
  }
  async findOne(
    condition: Prisma.newsImageFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.findFirst(condition);
  }
  async create(
    condition: Prisma.newsImageCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.create(condition);
  }
  async createMany(
    data: Prisma.newsImageCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.createMany(data);
  }
  async update(
    data: Prisma.newsImageUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.update(data);
  }
  async delete(
    condition: Prisma.newsImageDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.delete(condition);
  }
  async count(
    condition: Prisma.newsImageCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.newsImage.count(condition);
  }
}
