import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComplainProblemRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.findMany();
  }
  async findMany(
    condition: Prisma.complainProblemFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.findMany(condition);
  }
  async findOne(
    condition: Prisma.complainProblemFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.findFirst(condition);
  }
  async create(
    condition: Prisma.complainProblemCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.create(condition);
  }
  async createMany(
    data: Prisma.complainProblemCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.createMany(data);
  }
  async update(
    data: Prisma.complainProblemUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.update(data);
  }
  async delete(
    condition: Prisma.complainProblemDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.delete(condition);
  }
  async count(
    condition: Prisma.complainProblemCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.complainProblem.count(condition);
  }
}
