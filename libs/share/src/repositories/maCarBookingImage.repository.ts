import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarBookingImageRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.findMany();
  }
  async findMany(
    condition: Prisma.maCarBookImageFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarBookImageFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarBookImageCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.create(condition);
  }
  async createMany(
    data: Prisma.maCarBookImageCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.createMany(data);
  }
  async update(
    data: Prisma.maCarBookImageUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.update(data);
  }
  async delete(
    condition: Prisma.maCarBookImageDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.delete(condition);
  }
  async count(
    condition: Prisma.maCarBookImageCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBookImage.count(condition);
  }
}
