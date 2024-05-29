import { Injectable } from '@nestjs/common';
import { ProfileRuleMapRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileRuleMapService {
  constructor(private profileRuleMapRepo: ProfileRuleMapRepository) {}

  create(data: Prisma.profileRuleMapCreateInput) {
    const condition = { data: data } as Prisma.profileRuleMapCreateArgs;
    return this.profileRuleMapRepo.create(condition);
  }

  findAll() {
    return this.profileRuleMapRepo.findAll();
  }

  findByCondition(condition: Prisma.profileRuleMapFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.profileRuleMapRepo.findByCondition(condition);
  }

  async update(id: number, data: Prisma.profileRuleMapUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.profileRuleMapUpdateArgs;
    return await this.profileRuleMapRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.profileRuleMapDeleteArgs;
    return await this.profileRuleMapRepo.delete(condition);
  }
}
