import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupMapPermissionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.findMany();
  }
  async findMany(
    condition: Prisma.userGroupMapPermissionFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.findMany(condition);
  }
  async findFirst(
    condition: Prisma.userGroupMapPermissionFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.findFirst(condition);
  }
  async create(
    condition: Prisma.userGroupMapPermissionCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.create(condition);
  }
  async createMany(
    data: Prisma.userGroupMapPermissionCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.createMany(data);
  }
  async update(
    data: Prisma.userGroupMapPermissionUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.update(data);
  }
  async updateMany(
    data: Prisma.userGroupMapPermissionUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.updateMany(data);
  }
  async delete(
    condition: Prisma.userGroupMapPermissionDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.delete(condition);
  }

  async deleteMany(
    condition: Prisma.userGroupMapPermissionDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userGroupMapPermission.deleteMany(condition);
  }
}
