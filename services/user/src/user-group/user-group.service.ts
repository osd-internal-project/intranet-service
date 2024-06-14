import { Injectable } from '@nestjs/common';
import {
  OrganizedRepository,
  UserGroupRepository,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupService {
  constructor(
    private userGroupRepo: UserGroupRepository,
    private usersRepo: UsersRepository,
    private organizedRepo: OrganizedRepository,
  ) {}

  create(data: any) {
    const condition = {
      data: {
        groupName: data.groupName,
        description: data.description,
        parentGroupId: data.parentGroupId,
        organizedGroupId: data.organizeId,
        organizeMapGroup: { create: { organizedId: data.organizeId } },
      },
    } as Prisma.userGroupCreateArgs;
    return this.userGroupRepo.create(condition);
  }

  findAll() {
    return this.userGroupRepo.findAll();
  }

  findByCondition(condition: Prisma.userGroupFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userGroupRepo.findByCondition(condition);
  }

  findByOrganizeId(organizeId: string) {
    return this.organizedRepo.findOne({
      where: { organizedId: organizeId },
      select: { organizeMapGroup: { select: { group: true } } },
    });
  }

  findOneByCondition(condition: Prisma.userGroupFindFirstArgs) {
    condition = {
      ...condition,
    };
    return this.userGroupRepo.findOne(condition);
  }

  findChildGroupByGropId(groupId: string) {
    const condition = {
      where: { parentGroupId: groupId },
    };
    return this.userGroupRepo.findByCondition(condition);
  }

  findUserByGropId(groupId: string) {
    return this.usersRepo.findByCondition({ where: { ownerGroupId: groupId } });
  }

  async update(groupId: string, data: Prisma.userGroupUpdateInput) {
    const condition = {
      where: { groupId: groupId },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.userGroupUpdateArgs;
    return await this.userGroupRepo.update(condition);
  }

  async remove(groupId: string) {
    const condition = {
      where: { groupId: groupId },
    } as Prisma.userGroupDeleteArgs;
    await this.userGroupRepo.delete(condition);
  }
}
