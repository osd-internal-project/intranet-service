import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class emailTemplateFieldsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.findMany();
  }
  async findMany(
    condition: Prisma.emailTemplateFieldsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.findMany(condition);
  }
  async findOne(
    condition: Prisma.emailTemplateFieldsFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.findFirst(condition);
  }
  async create(
    condition: Prisma.emailTemplateFieldsCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.create(condition);
  }
  async createMany(
    data: Prisma.emailTemplateFieldsCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.createMany(data);
  }
  async update(
    data: Prisma.emailTemplateFieldsUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.update(data);
  }
  async delete(
    condition: Prisma.emailTemplateFieldsDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.delete(condition);
  }
  async count(
    condition: Prisma.emailTemplateFieldsCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplateFields.count(condition);
  }
}
