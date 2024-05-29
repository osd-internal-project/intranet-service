import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class LocationUserGroupMapRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.findMany();
  }
  async findMany(
    condition: Prisma.locationUserGroupMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.findMany(condition);
  }
  async findOne(
    condition: Prisma.locationUserGroupMapFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.findFirst(condition);
  }
  async create(
    condition: Prisma.locationUserGroupMapCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.create(condition);
  }
  async createMany(
    data: Prisma.locationUserGroupMapCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.createMany(data);
  }
  async update(
    data: Prisma.locationUserGroupMapUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.update(data);
  }
  async delete(
    condition: Prisma.locationUserGroupMapDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.locationUserGroupMap.delete(condition);
  }
}
