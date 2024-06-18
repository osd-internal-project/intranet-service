import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerAddressRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.findMany();
  }
  async findMany(
    condition: Prisma.customerAddressFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.findMany(condition);
  }
  async findOne(
    condition: Prisma.customerAddressFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.findFirst(condition);
  }
  async create(
    condition: Prisma.customerAddressCreateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.create(condition);
  }
  async createMany(
    data: Prisma.customerAddressCreateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.createMany(data);
  }
  async update(
    data: Prisma.customerAddressUpdateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.update(data);
  }
  async delete(
    condition: Prisma.customerAddressDeleteArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.delete(condition);
  }
  async count(
    condition: Prisma.customerAddressCountArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.count(condition);
  }
  async aggregate(
    condition: Prisma.CustomerAddressAggregateArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.customerAddress.aggregate(condition);
  }
}
