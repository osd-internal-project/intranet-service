import { Injectable } from '@nestjs/common';
import { MasterTypeLeaveRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterTypeLeaveService {
  constructor(private mastertypeleaveRepo: MasterTypeLeaveRepository) {}

  create(data: Prisma.masterTypeleaveCreateInput) {
    const condition = { data: data } as Prisma.masterTypeleaveCreateArgs;
    return this.mastertypeleaveRepo.create(condition);
  }

  findAll() {
    return this.mastertypeleaveRepo.findAll();
  }

  findByTypeId(id: number) {
    const base: Prisma.masterTypeleaveFindFirstArgs = {
      where: {
        typeId: id,
      },
    };
    return this.mastertypeleaveRepo.findOne(base);
  }

  async findByCondition(condition: Prisma.masterTypeleaveFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return await this.mastertypeleaveRepo.findMany(condition);
  }


  findOneByCondition(condition: Prisma.masterTypeleaveFindFirstArgsBase) {
    condition = {
      ...condition,
    };
    return this.mastertypeleaveRepo.findOne(condition);
  }

  async update(condition: Prisma.masterTypeleaveUpdateArgs) {
    return await this.mastertypeleaveRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterTypeleaveDeleteArgs;
    return await this.mastertypeleaveRepo.delete(condition);
  }
}
