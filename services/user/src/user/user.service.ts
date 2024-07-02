import { Injectable, Logger } from '@nestjs/common';
import {
  UsersRepository,
  UserGroupMapRepository,
  UserRoleMapRepository,
  UserMapOrganizeGroupRepository,
  UserMapOrganizeGroupOwnerRepository,
  UserGroupUserRoleMapRepository,
  AccessService,
  UserMapOrganizeChartRepository,
  OrganizedChartRepository,
  UserGroupRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  usersService: any;
  constructor(
    private usersRepo: UsersRepository,
    private userRoleMapRepo: UserRoleMapRepository,
    private userGroupMapRepo: UserGroupMapRepository,
    private userGroupRepo: UserGroupRepository,
    private userMapOrganizeGroupRepo: UserMapOrganizeGroupRepository,
    private userMapOrganizeGroupOwnerRepo: UserMapOrganizeGroupOwnerRepository,
    private userGroupUserRoleMapRepo: UserGroupUserRoleMapRepository,
    private UserMapOrganizeChartRepo: UserMapOrganizeChartRepository,
    private OrganizedChartRepo: OrganizedChartRepository,
    private readonly accessService: AccessService,
  ) {}

  create(data: Prisma.usersCreateInput) {
    const condition = { data: data } as Prisma.usersCreateArgs;
    return this.usersRepo.create(condition);
  }
  async createUserRoleMapByUserId(data: Prisma.userRoleMapCreateManyInput[]) {
    const condition = { data: data } as Prisma.userRoleMapCreateManyArgs;
    return this.userRoleMapRepo.createMany(condition);
  }

  async createUserGroupMapByUserId(data: Prisma.userGroupMapCreateManyInput[]) {
    const condition = { data: data } as Prisma.userGroupMapCreateManyArgs;
    return this.userGroupMapRepo.createMany(condition);
  }

  findAll() {
    return this.usersRepo.findAll();
  }

  async findByCondition(condition: Prisma.usersFindManyArgs, userId: string) {
    condition = {
      where: {
        ...condition.where,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    };

    return this.usersRepo.findByCondition(condition);
  }

  findOneByCondition(condition: Prisma.usersFindFirstArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    };
    return this.usersRepo.findOne(condition);
  }

  findByUsername(username: string) {
    const condition = { where: { username: username } } as Prisma.usersArgs;
    return this.usersRepo.findOne(condition);
  }

  findByUserId(userId: string) {
    const condition = { where: { userId: userId } } as Prisma.usersArgs;
    return this.usersRepo.findOne(condition);
  }

  async findOwnerUserByPositionId(positionId: string) {
    const condition = {
      where: {
        type: 'position',
        positionId: positionId,
      },
    };
    const cerrentOrganizedChart = await this.OrganizedChartRepo.findOne(
      condition,
    );
    let parentPositionId = cerrentOrganizedChart.parentPositionId;
    let HeadParentpositionId = cerrentOrganizedChart.positionId;
    if (parentPositionId) {
      while (parentPositionId) {
        const cerrentOrganizedChart = await this.OrganizedChartRepo.findOne({
          where: {
            type: 'position',
            positionId: parentPositionId,
          },
        });
        if (cerrentOrganizedChart) {
          HeadParentpositionId = cerrentOrganizedChart.positionId;
          parentPositionId = cerrentOrganizedChart.parentPositionId;
        } else {
          parentPositionId = null;
        }
      }
    }
    const resUserMapOrganizeChartRepo =
      await this.UserMapOrganizeChartRepo.findOne({
        where: { positionId: HeadParentpositionId },
      });
    return await this.usersRepo.findOne({
      where: { userId: resUserMapOrganizeChartRepo.userId },
    });
  }
  async findOrganizeuserByUserid(userId: string) {
    const organize = await this.userMapOrganizeGroupOwnerRepo.findOne({
      where: { usersId: userId },
    });

    return this.usersRepo.findByCondition({
      where: {
        userMapOrganizeGroupOwner: {
          some: { organizedId: organize.organizedId },
        },
      },
      select: { userId: true, firstNameTh: true, lastNameTh: true },
    });
  }
  async findSaleUserBySalePermission(userId: string) {
    Logger.debug(userId);
    const permissionGroup = await this.userGroupRepo.findOne({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    Logger.debug(permissionGroup);
    let userList = [];
    if (permissionGroup.saleUsersId.length > 0) {
      userList = permissionGroup.saleUsersId;
    } else if (permissionGroup.saleUserGroupId.length > 0) {
      const allGroup = await this.findAllRelatedGroupRows(
        permissionGroup.saleUserGroupId,
      );
      console.log('allGroup');
      console.log(allGroup);
      const groups = await this.userMapOrganizeGroupOwnerRepo.findMany({
        where: { ownerGroupId: { in: allGroup } },
      });
      userList = groups.map((group) => group.usersId);
    }

    return this.usersRepo.findByCondition({
      where: {
        userId: { in: userList },
      },
      select: { userId: true, firstNameTh: true, lastNameTh: true },
    });
  }

  async update(userId: string, data: Prisma.usersUpdateInput) {
    const condition = {
      where: { userId: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    } as Prisma.usersUpdateArgs;
    return await this.usersRepo.update(condition);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const condition = {
      where: { userId: userId },
      data: { refreshToken: refreshToken },
    } as Prisma.usersUpdateArgs;
    return await this.usersRepo.update(condition);
  }

  async remove(userId: string) {
    const condition = { where: { userId: userId } } as Prisma.usersDeleteArgs;
    return await this.usersRepo.delete(condition);
  }

  async removeUserRoleMapByUserId(userId: string) {
    const condition = {
      where: { userId: userId },
    } as Prisma.userRoleMapDeleteManyArgs;
    return await this.userRoleMapRepo.deleteMany(condition);
  }

  async removeUserGroupMapByUserId(userId: string, organizedGroupId: string) {
    const condition = {
      where: { userId: userId, organizedGroupId: organizedGroupId },
    } as Prisma.userGroupMapDeleteManyArgs;
    return await this.userGroupMapRepo.deleteMany(condition);
  }

  async setDef() {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash('P@ssw0rd', saltOrRounds);
    const pass = hashedPassword;
    return this.usersRepo.create({
      data: {
        username: 'admin',
        password: pass,
        userRoleMap: { create: { userRoleId: 'role0' } },
      },
    });
  }

  async defaultUser(userDetails: { username: string }) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash('P@ssw0rd', saltOrRounds);
    const pass = hashedPassword;
    return this.usersRepo.create({
      data: {
        username: userDetails.username,
        password: pass,
        email: `${userDetails.username}@osd.co.th`,
      },
    });
  }

  async uploadImags(userId: string, files: Express.Multer.File) {
    return this.usersRepo.update({
      where: {
        userId: userId,
      },
      data: {
        imageId: files.filename,
      },
    });
  }

  async assignGroups(
    userId: string,
    assignGroup: {
      organizeId?: string;
      groups?: string[];
    },
  ) {
    await this.userMapOrganizeGroupRepo.deleteMany({
      where: { usersId: userId, organizedId: assignGroup.organizeId },
    });

    const dataCreate = assignGroup.groups.map((item: string) => {
      return {
        usersId: userId,
        organizedId: assignGroup.organizeId,
        groupId: item,
      };
    });

    return this.userMapOrganizeGroupRepo.createMany({
      data: dataCreate,
    });
  }

  async assignOwnerGroups(
    userId: string,
    assignOwnerGroup: {
      organizeId?: string;
      groupOwnerId?: string;
    },
  ) {
    await this.userMapOrganizeGroupOwnerRepo.deleteMany({
      where: { usersId: userId, organizedId: assignOwnerGroup.organizeId },
    });
    return this.userMapOrganizeGroupOwnerRepo.create({
      data: {
        usersId: userId,
        organizedId: assignOwnerGroup.organizeId,
        ownerGroupId: assignOwnerGroup.groupOwnerId,
      },
    });
  }

  findAssignGroups(userId: string, organizeId: string) {
    return this.userMapOrganizeGroupRepo.findMany({
      where: { usersId: userId, organizedId: organizeId },
    });
  }
  //Functin Find All Oner Group
  findAssignOwnerGroups(userId: string, organizeId: string) {
    return this.userMapOrganizeGroupOwnerRepo.findOne({
      where: { usersId: userId, organizedId: organizeId },
    });
  }
  async findAllRelatedGroupRows(idList: string[]) {
    const result = [];
    const groupList = [...idList];

    while (groupList.length > 0) {
      const currentId = groupList.pop();

      // Fetch the node and its direct children
      const cerentRow = (await this.userGroupRepo.findOne({
        where: { groupId: currentId },
        include: { userGroup: true },
      })) as any;

      if (cerentRow) {
        result.push(cerentRow.groupId);
        groupList.push(...cerentRow.userGroup.map((child) => child.groupId));
      }
    }

    return result;
  }

  async findUsersByOwnergroup(ownerGroup: { [key: string]: string }) {
    const group: string[] = Object.values(ownerGroup);
    const allGroup = await this.findAllRelatedGroupRows(group);

    // const data = await this.userGroupRepo.findByCondition({
    //   where: { groupId: { in: group } },
    //   include: { userGroup: true },
    // });

    return this.usersRepo.findByCondition({
      where: {
        activeStatus: true,
        userMapOrganizeGroupOwner: {
          some: { ownerGroupId: { in: allGroup } },
        },
      },
      select: {
        userId: true,
        firstNameTh: true,
        lastNameTh: true,
      },
    });
  }
  async getPermissionByUserId(userId: string) {
    const resOrganizeIdGroupId = await this.userMapOrganizeGroupRepo.findMany({
      where: { usersId: userId },
    });
    const resRoleIdByGroupId = await this.userGroupUserRoleMapRepo.findMany({
      where: {
        userGroupId: {
          in: resOrganizeIdGroupId.map(
            (item: { organizedId: string; groupId: string }) => item.groupId,
          ),
        },
      },
      select: {
        userGroup: {
          select: {
            groupId: true,
            groupName: true,
            organizedGroupId: true,
          },
        },
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
    });
    const roles = resRoleIdByGroupId.flatMap((role: any) =>
      role.userRole.roleProfileMap.flatMap((profileRuleItem) =>
        profileRuleItem.profileRule.profileRuleMap.map(
          (masterRuleItem) => masterRuleItem.masterRule.ruleName,
        ),
      ),
    );
    const roleList = Array.from(new Set([].concat(...roles)));
    const grouplist = [];
    resRoleIdByGroupId.map((item: any) =>
      grouplist.push(item.userGroup.groupId),
    );
    return {
      rulelist: roleList,
      grouplist: grouplist,
    };
  }
}
