import { Injectable } from '@nestjs/common';
import {
  ProfileRuleRepository,
  ProfileRuleMapRepository,
  RoleProfileMapRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileRuleService {
  constructor(
    private profileRuleRepo: ProfileRuleRepository,
    private profileRuleMapRepo: ProfileRuleMapRepository,
    private roleProfileMapRepo: RoleProfileMapRepository,
  ) {}
  create(data: Prisma.profileRuleCreateInput) {
    const condition = { data: data } as Prisma.profileRuleCreateArgs;
    return this.profileRuleRepo.create(condition);
  }

  findAll() {
    return this.profileRuleRepo.findAll();
  }

  findByCondition(condition: Prisma.profileRuleFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.profileRuleRepo.findByCondition(condition);
  }

  findOneByCondition(condition: Prisma.profileRuleFindFirstArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.profileRuleRepo.findOne(condition);
  }

  async update(profileId: string, data: Prisma.profileRuleUpdateInput) {
    const condition = {
      where: { profileId: profileId },
      data: { ...data, updatedAt: new Date() },
    } as Prisma.profileRuleUpdateArgs;
    return await this.profileRuleRepo.update(condition);
  }

  async remove(profileId: string) {
    const condition = {
      where: { profileId: profileId },
    } as Prisma.profileRuleDeleteArgs;
    return await this.profileRuleRepo.delete(condition);
  }
  createProfileRuleMap(data: Prisma.profileRuleMapCreateManyInput[]) {
    const condition = { data: data } as Prisma.profileRuleMapCreateManyArgs;
    return this.profileRuleMapRepo.createMany(condition);
  }
  async removeProfileRuleMapByProfile(profileRuleId: string) {
    const condition = {
      where: { profileRuleId: profileRuleId },
    } as Prisma.profileRuleMapDeleteManyArgs;

    return await this.profileRuleMapRepo.deleteMany(condition);
  }
  async removeRoleProfileMapByProfile(profileRuleId: string) {
    const condition = {
      where: { profileRuleId: profileRuleId },
    } as Prisma.roleProfileMapDeleteManyArgs;

    return await this.roleProfileMapRepo.deleteMany(condition);
  }
}
