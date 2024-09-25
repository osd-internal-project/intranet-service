import { Injectable, Logger } from '@nestjs/common';
import {
  OrganizedRepository,
  UserGroupRepository,
  UserGroupUserRoleMapRepository,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupService {
  constructor(
    private userGroupRepo: UserGroupRepository,
    private usersRepo: UsersRepository,
    private organizedRepo: OrganizedRepository,
    private userGroupUserRoleMapRepo: UserGroupUserRoleMapRepository,
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
  async findOwnerFormOrganizedByUser(userId: string) {
    const organize = await this.organizedRepo.findOne({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    return this.organizedRepo.findOne({
      where: { organizedId: organize.organizedId },
      select: { organizeMapGroup: { select: { group: true } } },
    });
  }
  findByOrganizeId(organizeId: string) {
    return this.organizedRepo.findOne({
      where: { organizedId: organizeId },
      select: { organizeMapGroup: { select: { group: true } } },
    });
  }
  async findOneByCondition(condition: Prisma.userGroupFindFirstArgs) {
    condition = {
      ...condition,
    };
    const data = await this.userGroupRepo.findOne(condition);
    return data;
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

  async update(
    groupId: string,
    data: {
      groupId: string;
      headId: string;
      groupName: string;
      description?: string;
      userRole: string[];
    },
  ) {
    await this.userGroupUserRoleMapRepo.deleteMany({
      where: { userGroupId: groupId },
    });
    await this.userGroupUserRoleMapRepo.createMany({
      data: data.userRole.map((item: string) => ({
        userGroupId: groupId,
        roleId: item,
      })),
    });

    const condition = {
      where: { groupId: groupId },
      data: {
        groupName: data.groupName,
        description: data.description,
        headId: data.headId,
        updatedAt: new Date(),
      },
    } as Prisma.userGroupUpdateArgs;
    return await this.userGroupRepo.update(condition);
  }
  async updatePermission(groupId: string, data) {
    const condition = {
      where: { groupId: groupId },
      data: data,
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
