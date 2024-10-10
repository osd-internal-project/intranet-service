import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class emailTemplateTypeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.findMany();
  }
  async findMany(
    condition: Prisma.emailTemplateTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.findMany(condition);
  }
  async findOne(
    condition: Prisma.emailTemplateTypeFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.findFirst(condition);
  }
  async create(
    condition: Prisma.emailTemplateTypeCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.create(condition);
  }
  async createMany(
    data: Prisma.emailTemplateTypeCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.createMany(data);
  }
  async update(
    data: Prisma.emailTemplateTypeUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.update(data);
  }
  async delete(
    condition: Prisma.emailTemplateTypeDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.delete(condition);
  }
  async count(
    condition: Prisma.emailTemplateTypeCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateType.count(condition);
  }
}
