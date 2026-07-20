import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaVehicleTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.findMany();
  }
  async findMany(
    condition: Prisma.maVehicleTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.findMany(condition);
  }
  async findOne(
    condition: Prisma.maVehicleTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.findFirst(condition);
  }
  async create(
    condition: Prisma.maVehicleTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.create(condition);
  }
  async createMany(
    data: Prisma.maVehicleTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.createMany(data);
  }
  async update(
    data: Prisma.maVehicleTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.update(data);
  }
  async delete(
    condition: Prisma.maVehicleTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.delete(condition);
  }
  async count(
    condition: Prisma.maVehicleTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.maVehicleType.count(condition);
  }
}
