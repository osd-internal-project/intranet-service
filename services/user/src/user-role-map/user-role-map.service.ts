import { Injectable, Logger } from '@nestjs/common';
import { UserRoleMapRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRoleMapService {
  constructor(private userRoleMapRepo: UserRoleMapRepository) {}

  create(data: Prisma.userRoleMapCreateInput) {
    const condition = { data: data } as Prisma.userRoleMapCreateArgs;
    return this.userRoleMapRepo.create(condition);
  }

  findAll() {
    return this.userRoleMapRepo.findAll();
  }

  findByCondition(condition: Prisma.userRoleMapFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userRoleMapRepo.findByCondition(condition);
  }

  async update(id: number, data: Prisma.userRoleMapUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userRoleMapUpdateArgs;
    return await this.userRoleMapRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userRoleMapDeleteArgs;
    return await this.userRoleMapRepo.delete(condition);
  }

  async findRulelistByUserId(userId: string) {
    const condition = {
      where: { userId: userId },
      select: {
        userRole: {
          select: {
            roleProfileMap: {
              select: {
                profileRule: {
                  select: {
                    profileRuleMap: {
                      select: {
                        masterRule: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    } as Prisma.userRoleMapFindManyArgs;
    const data = (await this.userRoleMapRepo.findByCondition(condition)) as any;

    //Json Object to Array
    const roles = data.flatMap((role) =>
      role.userRole.roleProfileMap.flatMap((profileRuleItem) =>
        profileRuleItem.profileRule.profileRuleMap.map(
          (masterRuleItem) => masterRuleItem.masterRule.ruleName,
        ),
      ),
    );
    const roleList = Array.from(new Set([].concat(...roles)));
    return roleList;
  }
}
