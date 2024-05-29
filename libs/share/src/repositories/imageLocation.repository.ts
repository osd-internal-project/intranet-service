import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ImageLocationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesLocation.findMany();
  }

  async createImagesLocation(
    data: Prisma.imagesLocationCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return await prisma.imagesLocation.createMany({
      data,
    });
  }

  async getFilesImageLocation(id: number, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return await prisma.imagesLocation.findMany({
      where: { images_location: Number(id) },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async update(
    condition: Prisma.imagesLocationUpdateManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesLocation.updateMany(condition);
  }

  async deleteMany(
    condition: Prisma.imagesLocationDeleteManyArgs,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.imagesLocation.deleteMany(condition);
  }
}
