import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaVehicleTypeGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.findMany();
  }
  async findMany(
    condition: Prisma.maVehicleTypeGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.findMany(condition);
  }
  async findOne(
    condition: Prisma.maVehicleTypeGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.maVehicleTypeGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.create(condition);
  }
  async createMany(
    data: Prisma.maVehicleTypeGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.createMany(data);
  }
  async update(
    data: Prisma.maVehicleTypeGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.update(data);
  }
  async delete(
    condition: Prisma.maVehicleTypeGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.delete(condition);
  }
  async count(
    condition: Prisma.maVehicleTypeGroupCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleTypeGroup.count(condition);
  }
}
