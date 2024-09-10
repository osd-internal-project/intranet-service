import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarWrapupImageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.findMany();
  }
  async findMany(
    condition: Prisma.maCarWrapupImageFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarWrapupImageFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarWrapupImageCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.create(condition);
  }
  async createMany(
    data: Prisma.maCarWrapupImageCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.createMany(data);
  }
  async update(
    data: Prisma.maCarWrapupImageUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.update(data);
  }
  async delete(
    condition: Prisma.maCarWrapupImageDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.delete(condition);
  }
  async count(
    condition: Prisma.maCarWrapupImageCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarWrapupImage.count(condition);
  }
}
