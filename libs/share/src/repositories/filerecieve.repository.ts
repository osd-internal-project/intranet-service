import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class FileRecieveStockRepository {
  constructor(private prisma: PrismaService) {}

  async createfileRecieve(
    data: Prisma.fileRecieveCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return await prisma.fileRecieve.createMany({
      data,
    });
  }
  async findOne(
    condition: Prisma.fileRecieveFindFirstArgsBase,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.fileRecieve.findFirst(condition);
  }
  async update(
    condition: Prisma.fileRecieveUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.fileRecieve.updateMany(condition);
  }

  async deleteMany(
    condition: Prisma.fileRecieveDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.fileRecieve.deleteMany(condition);
  }
}
