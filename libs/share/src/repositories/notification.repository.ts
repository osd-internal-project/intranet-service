import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    condition: Prisma.notificationFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.findMany(condition);
  }
  async findOne(
    condition: Prisma.notificationFindFirstArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.findFirst(condition);
  }
  async create(
    condition: Prisma.notificationCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.create(condition);
  }
  async createMany(
    data: Prisma.notificationCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.createMany(data);
  }
  async update(
    data: Prisma.notificationUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.update(data);
  }
  async updateMany(
    data: Prisma.notificationUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.updateMany(data);
  }
  async delete(
    condition: Prisma.notificationDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.delete(condition);
  }
  async count(
    condition: Prisma.notificationCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notification.count(condition);
  }
}
