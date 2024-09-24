import { Injectable, Logger } from '@nestjs/common';
import { UserGroupMapHeaderRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupMapHeaderService {
  constructor(private userGroupMapHeaderRepo: UserGroupMapHeaderRepository) {}

  create(data: Prisma.userGroupMapCreateInput) {
    const condition = { data: data } as Prisma.userGroupMapHeaderCreateArgs;
    Logger.debug('data:', data);
    return this.userGroupMapHeaderRepo.create(condition);
  }

  findAll() {
    return this.userGroupMapHeaderRepo.findAll();
  }

  findByCondition(condition: Prisma.userGroupMapHeaderFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userGroupMapHeaderRepo.findByCondition(condition);
  }

  async update(id: number, data: Prisma.userGroupMapHeaderUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userGroupMapUpdateArgs;
    return await this.userGroupMapHeaderRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userGroupMapHeaderDeleteArgs;
    return await this.userGroupMapHeaderRepo.delete(condition);
  }

  async findGrouplistByUserId(userId: string) {
    const condition = {
      where: { userId: userId },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    } as Prisma.userGroupMapHeaderFindManyArgs;
    const group = await this.userGroupMapHeaderRepo.findByCondition(condition);
    const grouplist = [];
    group.map((item) => grouplist.push(item.userGroupId));

    return grouplist;
  }
}
