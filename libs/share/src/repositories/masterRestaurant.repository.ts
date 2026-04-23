import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class masterRestaurantRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.findMany();
  }
  async findMany(
    condition: Prisma.masterRestaurantFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.findMany(condition);
  }
  async findOne(
    condition: Prisma.masterRestaurantFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.findFirst(condition);
  }
  async create(
    condition: Prisma.masterRestaurantCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.create(condition);
  }
  async createMany(
    data: Prisma.masterRestaurantCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.createMany(data);
  }
  async update(
    data: Prisma.masterRestaurantUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.update(data);
  }
  async delete(
    condition: Prisma.masterRestaurantDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.delete(condition);
  }
  async count(
    condition: Prisma.masterRestaurantCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.count(condition);
  }
  async aggregate(
    condition: Prisma.MasterRestaurantAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.masterRestaurant.aggregate(condition);
  }
}
