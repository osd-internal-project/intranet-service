import { Injectable } from '@nestjs/common';
import { UnitRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

@Injectable()
export class UnitService {
  constructor(private readonly unitRepo: UnitRepository) {}
  create(createUnitDto: Prisma.unitCreateInput) {
    return this.unitRepo.create({ data: createUnitDto });
  }

  async findAll(query: Prisma.unitWhereInput, skip: number, take: number) {
    let filter = {};
    if (query?.unitName) {
      filter = { ...filter, unitName: { contains: query?.unitName } };
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
    const data = await this.unitRepo.findMany({
      where: filter,
      skip,
      take,
    });
    const count = await this.unitRepo.count({ where: filter });
    return { data, count };
  }

  async findOne(
    id: number,
    query: Prisma.unitWhereInput,
    skip: number,
    take: number,
  ) {
    const data = await this.unitRepo.findMany({
      where: { ...query, id },
      skip,
      take,
    });
    const count = await this.unitRepo.count({ where: { ...query } });
    return { data, count };
  }

  update(id: number, updateUnitDto: Prisma.unitUpdateInput) {
    return this.unitRepo.update({ where: { id }, data: { ...updateUnitDto } });
  }

  remove(id: number) {
    return this.unitRepo.delete({ where: { id } });
  }
}
