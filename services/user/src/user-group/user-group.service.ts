import { Injectable } from '@nestjs/common';
import { UserGroupRepository, UsersRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupService {
  constructor(
    private userGroupRepo: UserGroupRepository,
    private usersRepo: UsersRepository,
  ) {}

  create(data: Prisma.userGroupCreateInput) {
    const condition = { data: data } as Prisma.userGroupCreateArgs;
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
    return await this.userGroupRepo.delete(condition);
  }
}
