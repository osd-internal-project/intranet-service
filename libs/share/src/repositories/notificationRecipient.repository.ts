import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationRecipientRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notificationRecipient.findMany({ orderBy: { id: 'asc' } });
  }
  async findMany(
    condition: Prisma.notificationRecipientFindManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notificationRecipient.findMany(condition);
  }
  async create(
    condition: Prisma.notificationRecipientCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notificationRecipient.create(condition);
  }
  async delete(
    condition: Prisma.notificationRecipientDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notificationRecipient.delete(condition);
  }
  async count(
    condition: Prisma.notificationRecipientCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.notificationRecipient.count(condition);
  }
}
