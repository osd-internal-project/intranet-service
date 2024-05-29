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

  async setProfile() {
    return this.profileRuleRepo.create({
      data: {
        profileId: 'profile0',
        profileName: 'all-rule',
        profileRuleMap: {
          createMany: {
            data: [
              { masterRuleId: 'rlue1' },
              { masterRuleId: 'rlue2' },
              { masterRuleId: 'rlue3' },
              { masterRuleId: 'rlue4' },
              { masterRuleId: 'rlue5' },
              { masterRuleId: 'rlue6' },
              { masterRuleId: 'rlue7' },
              { masterRuleId: 'rlue8' },
              { masterRuleId: 'rlue9' },
              { masterRuleId: 'rlue10' },
              { masterRuleId: 'rlue11' },
              { masterRuleId: 'rlue12' },
              { masterRuleId: 'rlue13' },
              { masterRuleId: 'rlue14' },
              { masterRuleId: 'rlue15' },
              { masterRuleId: 'rlue16' },
              { masterRuleId: 'rlue17' },
              { masterRuleId: 'rlue18' },
              { masterRuleId: 'rlue19' },
              { masterRuleId: 'rlue20' },
              { masterRuleId: 'rlue21' },
              { masterRuleId: 'rlue22' },
              { masterRuleId: 'rlue23' },
              { masterRuleId: 'rlue24' },
              { masterRuleId: 'rlue25' },
              { masterRuleId: 'rlue26' },
              { masterRuleId: 'rlue27' },
              { masterRuleId: 'rlue28' },
              { masterRuleId: 'rlue29' },
              { masterRuleId: 'rlue30' },
              { masterRuleId: 'rlue31' },
              { masterRuleId: 'rlue32' },
              { masterRuleId: 'rlue33' },
              { masterRuleId: 'rlue34' },
              { masterRuleId: 'rlue35' },
              { masterRuleId: 'rlue36' },
              { masterRuleId: 'rlue37' },
              { masterRuleId: 'rlue38' },
              { masterRuleId: 'rlue39' },
              { masterRuleId: 'rlue40' },
              { masterRuleId: 'rlue41' },
              { masterRuleId: 'rlue42' },
              { masterRuleId: 'rlue43' },
              { masterRuleId: 'rlue44' },
              { masterRuleId: 'rlue45' },
              { masterRuleId: 'rlue46' },
              { masterRuleId: 'rlue47' },
              { masterRuleId: 'rlue48' },
              { masterRuleId: 'rlue49' },
              { masterRuleId: 'rlue50' },
              { masterRuleId: 'rlue51' },
              { masterRuleId: 'rlue52' },
              { masterRuleId: 'rlue53' },
              { masterRuleId: 'rlue54' },
              { masterRuleId: 'rlue55' },
              { masterRuleId: 'rlue56' },
              { masterRuleId: 'rlue57' },
              { masterRuleId: 'rlue58' },
              { masterRuleId: 'rlue59' },
              { masterRuleId: 'rlue60' },
              { masterRuleId: 'rlue61' },
              { masterRuleId: 'rlue62' },
              { masterRuleId: 'rlue63' },
              { masterRuleId: 'rlue64' },
              { masterRuleId: 'rlue65' },
              { masterRuleId: 'rlue66' },
              { masterRuleId: 'rlue67' },
              { masterRuleId: 'rlue68' },
              { masterRuleId: 'rlue69' },
              { masterRuleId: 'rlue70' },
              { masterRuleId: 'rlue71' },
              { masterRuleId: 'rlue72' },
              { masterRuleId: 'rlue73' },
              { masterRuleId: 'rlue74' },
              { masterRuleId: 'rlue75' },
              { masterRuleId: 'rlue76' },
            ],
          },
        },
      },
    });
  }
}
