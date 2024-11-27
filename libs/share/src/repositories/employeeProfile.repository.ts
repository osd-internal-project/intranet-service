import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.findMany();
  }
  async findMany(
    condition: Prisma.employeeProfilesFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.findMany(condition);
  }
  async findOne(
    condition: Prisma.employeeProfilesFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.findFirst(condition);
  }
  async create(
    condition: Prisma.employeeProfilesCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.create(condition);
  }
  async createMany(
    data: Prisma.employeeProfilesCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.createMany(data);
  }
  async update(
    data: Prisma.employeeProfilesUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.update(data);
  }
  async delete(
    condition: Prisma.employeeProfilesDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.delete(condition);
  }
  async count(
    condition: Prisma.employeeProfilesCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.employeeProfiles.count(condition);
  }
}
