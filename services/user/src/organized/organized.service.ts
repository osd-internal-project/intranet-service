import { Injectable } from '@nestjs/common';
import { OrganizedRepository, UserGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizedService {
  constructor(
    private organizedRepo: OrganizedRepository,
    private userGroupRepo: UserGroupRepository,
  ) {}

  create(data: Prisma.organizedCreateInput) {
    const condition = { data: data } as Prisma.organizedCreateArgs;
    return this.organizedRepo.create(condition);
  }
  createRootGroupUser(data: Prisma.userGroupCreateInput) {
    const condition = { data: data } as Prisma.userGroupCreateArgs;
    return this.userGroupRepo.create(condition);
  }
  findAll() {
    return this.organizedRepo.findAll();
  }

  findByCondition(condition: Prisma.organizedFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.organizedRepo.findByCondition(condition);
  }

  async update(organizedId: string, data: Prisma.organizedUpdateInput) {
    const condition = {
      where: { organizedId: organizedId },
      data: data,
    } as Prisma.organizedUpdateArgs;
    return await this.organizedRepo.update(condition);
  }

  async updateRootGroupUser(data: Prisma.userGroupUpdateInput) {
    const condition = {
      where: { organizedGroupId: null },
      data: data,
    } as Prisma.userGroupUpdateManyArgs;
    return await this.userGroupRepo.updateMany(condition);
  }

  async remove(organizedId: string) {
    const condition = {
      where: { organizedId: organizedId },
    } as Prisma.organizedDeleteArgs;
    return await this.organizedRepo.delete(condition);
  }

  async removeRootGroupUser(organizedId: string) {
    const condition = {
      where: { organizedGroupId: organizedId },
    } as Prisma.userGroupDeleteManyArgs;
    return await this.userGroupRepo.deleteMany(condition);
  }
}
