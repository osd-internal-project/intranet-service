import { Injectable } from '@nestjs/common';
import { MasterProductRepository } from '@inventory/share';
import dayjs from 'dayjs';
import { Prisma } from '@prisma/client';
import * as fs from 'fs/promises';

@Injectable()
export class MasterProductService {
  constructor(private readonly masterproductRepo: MasterProductRepository) {}

  create(createUnitDto: any) {
    const data = {
      prdName: createUnitDto.prdName,
      description: createUnitDto.description,
      totalQty: 0.0,
      price: createUnitDto.price,
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
    if (query?.prdName) {
      filter = { ...filter, prdName: { contains: query?.prdName } };
    }
    if (query?.updatedBy) {
      filter = { ...filter, updatedBy: { contains: query?.updatedBy } };
    }
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
      include: { masterProductImage: true, unit: true, order: true },
      skip,
      take,
    });
    const count = await this.masterproductRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(prdId: string, query: Prisma.masterProductWhereInput) {
    const data = await this.masterproductRepo.findOne({
      where: { prdId: prdId },
      include: {
        masterProductImage: true,
        unit: { select: { unitID: true, unitName: true } },
        order: true,
      },
    });
    return data;
  }

  update(id: number, updateUnitDto: any) {
    const data = {
      prdName: updateUnitDto.prdName,
      description: updateUnitDto.description,
      totalQty: updateUnitDto.totalQty,
      price: updateUnitDto.price,
      unit: {
        connect: {
          unitID: updateUnitDto.unitId,
        },
      },
      updatedBy: updateUnitDto.updatedBy,
    } as Prisma.masterProductUpdateInput;
    return this.masterproductRepo.update({
      where: { id },
      data: { ...data },
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
