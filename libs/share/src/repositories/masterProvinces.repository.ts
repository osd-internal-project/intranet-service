import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProvinceRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.findMany();
  }
  async findMany(
    condition: Prisma.masterProvinceThailandFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterProvinceThailandFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.findFirst(condition);
  }
  async create(
    condition: Prisma.masterProvinceThailandCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.create(condition);
  }
  async createMany(
    data: Prisma.masterProvinceThailandCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.createMany(data);
  }
  async update(
    data: Prisma.masterProvinceThailandUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.update(data);
  }
  async delete(
    condition: Prisma.masterProvinceThailandDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.delete(condition);
  }
  async count(
    condition: Prisma.masterProvinceThailandCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterProvinceThailand.count(condition);
  }
}
