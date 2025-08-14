import { Injectable } from '@nestjs/common';
import { MasterProductRepository } from '@inventory/share';
import * as dayjs from 'dayjs';
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
          gte: dayjs(query.createdAt[0]).startOf('date').toDate(),
          lte: dayjs(query.createdAt[1]).endOf('date').toDate(),
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

  async findOneByBarcode(barcode: string) {
    const data = await this.masterproductRepo.findOne({
      where: { barcode },
      include: {
        masterProductImage: true,
        unit: { select: { unitID: true, unitName: true } },
        order: true,
      },
    });
    return data;
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

  async updateQty(id: number, updateUnitDto: { totalQty: number }) {
    const findMasterProduct = await this.masterproductRepo.findOne({
      where: { id },
      select: { totalQty: true },
    });
    if (!findMasterProduct) {
      return { text: 'ไม่มีสินค้าในระบบ', status: 404, data: {} };
    }

    if (updateUnitDto.totalQty <= 0) {
      return {
        text: 'จำนวนรวมต้องมากกว่าศูนย์',
        status: 400,
        data: {},
      };
    }

    if (findMasterProduct.totalQty < updateUnitDto.totalQty) {
      return {
        text: 'จำนวนของในสต็อกมีไม่เพียงพอต่อความต้องการ',
        status: 400,
        data: {},
      };
    }

    if (findMasterProduct.totalQty === updateUnitDto.totalQty) {
      return {
        text: 'Total quantity is already equal to the update value',
        status: 409,
        data: {},
      };
    }

    const updated = await this.masterproductRepo.update({
      where: { id },
      data: {
        totalQty: findMasterProduct.totalQty - updateUnitDto.totalQty,
      } as Prisma.masterProductUpdateInput,
    });

    return {
      text: 'Successfully updated total quantity',
      status: 200,
      data: updated,
    };
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
