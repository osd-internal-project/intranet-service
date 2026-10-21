import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarImageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.findMany();
  }
  async findMany(
    condition: Prisma.maCarImageFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarImageFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarImageCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.create(condition);
  }
  async createMany(
    data: Prisma.maCarImageCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.createMany(data);
  }
  async update(
    data: Prisma.maCarImageUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.update(data);
  }
  async delete(
    condition: Prisma.maCarImageDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.delete(condition);
  }
  async count(
    condition: Prisma.maCarImageCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarImage.count(condition);
  }
}
