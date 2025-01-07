import { Injectable, Logger } from '@nestjs/common';
import { MasterProductGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductGroupService {
  constructor(private masterProductGroupRepo: MasterProductGroupRepository) {}

  async create(data: Prisma.masterProductGroupCreateInput) {
    // const lastRow = await this.masterProductGroupRepo.findOne({
    //   orderBy: {
    //     id: 'desc',
    //   },
    // });
    // let groupCode = null;
    // if (lastRow) {
    //   groupCode = 'INV-G-' + String(lastRow.id + 1).padStart(6, '0');
    // } else {
    //   groupCode = 'INV-G-000001';
    // }
    // data.groupCode = groupCode;
    // const condition = { data: data } as Prisma.masterProductGroupCreateArgs;
    // return this.masterProductGroupRepo.create(condition);
  }

  findAll() {
    return this.masterProductGroupRepo.findAll();
  }

  findMany(condition: Prisma.masterProductGroupFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          createdAt: 'asc',
        },
        { id: 'asc' },
      ],
    };
    return this.masterProductGroupRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.masterProductGroupUpdateInput) {
    const condition = {
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.masterProductGroupUpdateArgs;
    return await this.masterProductGroupRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterProductGroupDeleteArgs;
    return await this.masterProductGroupRepo.delete(condition);
  }
}
