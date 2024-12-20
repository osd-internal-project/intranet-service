import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class VenderTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(
    condition: Prisma.venderTypeFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.findMany(condition);
  }
  async findByCondition(
    condition: Prisma.venderTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.findMany(condition);
  }
  async findOneByCondition(
    condition: Prisma.venderTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.findFirst(condition);
  }
  async create(
    condition: Prisma.venderTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.create(condition);
  }

  async createContact(
    condition: Prisma.contactCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.createMany(condition);
  }
  async createMany(
    data: Prisma.venderTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.createMany(data);
  }
  async update(
    data: Prisma.venderTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.update(data);
  }
  async delete(
    condition: Prisma.venderTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.delete(condition);
  }
  async deleteMany(
    condition: Prisma.contactDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contact.deleteMany(condition);
  }

  async count(
    condition: Prisma.venderTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.venderType.count(condition);
  }
}
