import { Injectable } from '@nestjs/common';
import { MasterProductRepository } from '@inventory/share';
import dayjs from 'dayjs';
import { Prisma } from '@prisma/client'; // Replace with your entity
import * as fs from 'fs/promises'; // For async file operations
import * as path from 'path';

@Injectable()
export class MasterProductService {
  constructor(private readonly masterproductRepo: MasterProductRepository) {}

  create(createUnitDto: any) {
    const data = {
      prdName: createUnitDto.prdName,
      expired: createUnitDto.expired,
      description: createUnitDto.description,
      responsible: '',
      unit: {
        connect: {
          unitID: createUnitDto.unitId,
        },
      },
      updatedBy: createUnitDto.updatedBy,
    } as Prisma.masterProductCreateInput;
    return this.masterproductRepo.create({ data: { ...data } });
  }

  async findAll(
    query: Prisma.masterProductWhereInput,
    skip: number,
    take: number,
  ) {
    let filter = {};
    if (query?.createdAt) {
      filter = {
        ...filter,
        createdAt: {
          gte: dayjs(query.createdAt as string)
            .startOf('date')
            .toDate(),
          lte: dayjs(query.createdAt as string)
            .endOf('date')
            .toDate(),
        },
      };
    }
    const data = await this.masterproductRepo.findMany({
      where: filter,
      include: { masterProductImage: true, unit: true },
      skip,
      take,
    });
    const count = await this.masterproductRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(
    id: number,
    query: Prisma.unitWhereInput,
    skip: number,
    take: number,
  ) {
    const data = await this.masterproductRepo.findMany({
      where: { ...query, id },
      skip,
      take,
    });
    const count = await this.masterproductRepo.count({ where: { ...query } });
    return { data, count };
  }

  update(id: number, updateUnitDto: Prisma.unitUpdateInput) {
    return this.masterproductRepo.update({
      where: { id },
      data: { ...updateUnitDto },
    });
  }

  async remove(id: number) {
    const image = (await this.masterproductRepo.findOne({
      where: { id },
      include: { masterProductImage: true },
    })) as any;
    try {
      const filePath = image.masterProductImage?.[0]?.filePath;
      if (filePath) {
        await fs.unlink(filePath);
        console.log(`Image deleted: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error deleting image file: ${error}`);
    }
    return this.masterproductRepo.delete({ where: { id } });
  }
}
