import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserMapOrganizeGroupOwnerRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.findMany();
  }
  async findMany(
    condition: Prisma.userMapOrganizeGroupOwnerFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.findMany(condition);
  }
  async findOne(
    condition: Prisma.userMapOrganizeGroupOwnerFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.findFirst(condition);
  }
  async create(
    condition: Prisma.userMapOrganizeGroupOwnerCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.create(condition);
  }
  async createMany(
    data: Prisma.userMapOrganizeGroupOwnerCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.createMany(data);
  }
  async update(
    data: Prisma.userMapOrganizeGroupOwnerUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.update(data);
  }
  async delete(
    condition: Prisma.userMapOrganizeGroupOwnerDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.delete(condition);
  }
  async deleteMany(
    condition: Prisma.userMapOrganizeGroupOwnerDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.deleteMany(condition);
  }
  async count(
    condition: Prisma.userMapOrganizeGroupOwnerCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userMapOrganizeGroupOwner.count(condition);
  }
}
