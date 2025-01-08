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
    return this.userGroupMapHeaderRepo.findMany(condition);
  }

  update(id: number, data: Prisma.userGroupMapHeaderUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userGroupMapHeaderUpdateArgs;
    return this.userGroupMapHeaderRepo.update(condition);
  }

  async updatePermission(
    groupId: string,
    data: { headerGroupId: string[]; type: string },
  ) {
    const record = await this.userGroupMapHeaderRepo.findFirst({
      where: { type: data.type, userGroupId: groupId },
    });
    if (record) {
      const condition = {
        where: { userGroupId: groupId, type: data.type },
        data: data,
      } as Prisma.userGroupMapHeaderUpdateArgs;
      console.log(groupId);
      console.log(data);
      return await this.userGroupMapHeaderRepo.updateMany(condition);
    } else {
      const condition = {
        data: { userGroupId: groupId, ...data },
      } as Prisma.userGroupMapHeaderCreateArgs;
      console.log(groupId);
      console.log(data);
      return await this.userGroupMapHeaderRepo.create(condition);
    }
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
    const group = await this.userGroupMapHeaderRepo.findMany(condition);
    const grouplist = [];
    group.map((item) => grouplist.push(item.userGroupId));

    return grouplist;
  }
}
