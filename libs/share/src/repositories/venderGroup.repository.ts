import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class VenderGroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.venderGroupFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.findMany(condition);
  }
  async findByCondition(
    condition: Prisma.venderGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.findMany(condition);
  }
  async findOneByCondition(
    condition: Prisma.venderGroupFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.findFirst(condition);
  }
  async create(
    condition: Prisma.venderGroupCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.create(condition);
  }

  async createContact(
    condition: Prisma.contactCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.createMany(condition);
  }
  async createMany(
    data: Prisma.venderGroupCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.createMany(data);
  }
  async update(
    data: Prisma.venderGroupUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.update(data);
  }
  async delete(
    condition: Prisma.venderGroupDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.delete(condition);
  }
  async deleteMany(
    condition: Prisma.contactDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.deleteMany(condition);
  }

  async count(
    condition: Prisma.venderGroupCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderGroup.count(condition);
  }
}
