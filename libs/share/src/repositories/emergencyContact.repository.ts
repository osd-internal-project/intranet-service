import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmergencyContactRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.findMany();
  }
  async findMany(
    condition: Prisma.emergencyContactFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.findMany(condition);
  }
  async findOne(
    condition: Prisma.emergencyContactFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.findFirst(condition);
  }
  async create(
    condition: Prisma.emergencyContactCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.create(condition);
  }
  async createMany(
    data: Prisma.emergencyContactCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.createMany(data);
  }
  async update(
    data: Prisma.emergencyContactUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.update(data);
  }
  async delete(
    condition: Prisma.emergencyContactDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.delete(condition);
  }
  async count(
    condition: Prisma.emergencyContactCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.emergencyContact.count(condition);
  }
}
