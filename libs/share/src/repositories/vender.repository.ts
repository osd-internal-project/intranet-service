import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class VenderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.venderFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.findMany(condition);
  }
  async findByCondition(
    condition: Prisma.venderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.findMany(condition);
  }
  async findOneByCondition(
    condition: Prisma.venderFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.findFirst(condition);
  }
  async create(
    condition: Prisma.venderCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.create(condition);
  }

  async createContact(
    condition: Prisma.contactCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.createMany(condition);
  }
  async createMany(
    data: Prisma.venderCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.createMany(data);
  }
  async update(
    data: Prisma.venderUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.update(data);
  }
  async delete(
    condition: Prisma.venderDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.delete(condition);
  }
  async deleteMany(
    condition: Prisma.contactDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.deleteMany(condition);
  }

  async count(
    condition: Prisma.venderCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.vender.count(condition);
  }
}
