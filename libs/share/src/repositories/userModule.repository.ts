import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserModuleRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.findMany();
  }
  async findMany(
    condition: Prisma.userModuleFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.findMany(condition);
  }
  async findFirst(
    condition: Prisma.userModuleFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.findFirst(condition);
  }
  async create(
    condition: Prisma.userModuleCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.create(condition);
  }
  async createMany(
    data: Prisma.userModuleCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.createMany(data);
  }
  async update(
    data: Prisma.userModuleUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.update(data);
  }
  async updateMany(
    data: Prisma.userModuleUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.updateMany(data);
  }
  async delete(
    condition: Prisma.userModuleDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userModuleDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userModule.deleteMany(condition);
  }
}
