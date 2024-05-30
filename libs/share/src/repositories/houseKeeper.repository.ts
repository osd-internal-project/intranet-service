import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class HouseKeeperRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.findMany();
  }
  async findMany(
    condition: Prisma.houseKeeperFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.findMany(condition);
  }
  async findOne(
    condition: Prisma.houseKeeperFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.findFirst(condition);
  }
  async create(
    condition: Prisma.houseKeeperCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.create(condition);
  }
  async createMany(
    data: Prisma.houseKeeperCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.createMany(data);
  }
  async update(
    data: Prisma.houseKeeperUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.update(data);
  }
  async delete(
    condition: Prisma.houseKeeperDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.delete(condition);
  }
  async count(
    condition: Prisma.houseKeeperCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.houseKeeper.count(condition);
  }
}
