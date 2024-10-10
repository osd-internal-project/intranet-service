import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class emailTemplateRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.findMany();
  }
  async findMany(
    condition: Prisma.emailTemplateFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.findMany(condition);
  }
  async findOne(
    condition: Prisma.emailTemplateFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.findFirst(condition);
  }
  async create(
    condition: Prisma.emailTemplateCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.create(condition);
  }
  async createMany(
    data: Prisma.emailTemplateCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.createMany(data);
  }
  async update(
    data: Prisma.emailTemplateUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.update(data);
  }
  async delete(
    condition: Prisma.emailTemplateDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.delete(condition);
  }
  async count(
    condition: Prisma.emailTemplateCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emailTemplate.count(condition);
  }
}
