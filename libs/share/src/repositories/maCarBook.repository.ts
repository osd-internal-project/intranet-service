import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarBookRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.findMany();
  }
  async findMany(
    condition: Prisma.maCarBookFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.findMany(condition);
  }
  async findOne(
    condition: Prisma.maCarBookFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.findFirst(condition);
  }
  async create(
    condition: Prisma.maCarBookCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.create(condition);
  }
  async createMany(
    data: Prisma.maCarBookCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.createMany(data);
  }
  async update(
    data: Prisma.maCarBookUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.update(data);
  }
  async delete(
    condition: Prisma.maCarBookDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.delete(condition);
  }
  async count(
    condition: Prisma.maCarBookCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maCarBook.count(condition);
  }
}
