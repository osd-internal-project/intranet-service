import { Injectable, Logger } from '@nestjs/common';
import { UserGroupMapRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupMapService {
  constructor(private userGroupMapRepo: UserGroupMapRepository) {}

  create(data: Prisma.userGroupMapCreateInput) {
    const condition = { data: data } as Prisma.userGroupMapCreateArgs;
    return this.userGroupMapRepo.create(condition);
  }

  findAll() {
    return this.userGroupMapRepo.findAll();
  }

  findByCondition(condition: Prisma.userGroupMapFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userGroupMapRepo.findByCondition(condition);
  }

  async update(id: number, data: Prisma.userGroupMapUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userGroupMapUpdateArgs;
    return await this.userGroupMapRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.userGroupMapDeleteArgs;
    return await this.userGroupMapRepo.delete(condition);
  }

  async findGrouplistByUserId(userId: string) {
    const condition = {
      where: { userId: userId },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    } as Prisma.userGroupMapFindManyArgs;
    const group = await this.userGroupMapRepo.findByCondition(condition);
    const grouplist = [];
    group.map((item) => grouplist.push(item.userGroupId));

    return grouplist;
  }
}
