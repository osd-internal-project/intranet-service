import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}
  //All Group
  async getOwnerGroupId(userId: string): Promise<string[]> {
    const resUser = await this.prisma.users.findFirst({
      where: {
        userId: userId,
      },
      select: {
        userMapOrganizeGroupOwner: {
          select: {
            ownerGroupId: true,
          },
        },
        userMapOrganizeGroup: {
          select: {
            groupId: true,
          },
        },
      },
    });

    const filterGroupId = resUser.userMapOrganizeGroupOwner[0].ownerGroupId
      ? [resUser.userMapOrganizeGroupOwner[0].ownerGroupId]
      : [];

    if (filterGroupId.length > 0) {
      const masterGroup = await this.prisma.userGroup.findFirst({
        where: { groupId: filterGroupId[0] },
        include: { userGroup: true },
      });

      // if (masterGroup.parentGroupId === null) {
      //   const ownerGroupAll = await this.prisma.userGroup.findMany({});
      //   const ownerGroupsId = ownerGroupAll.map((item) => {
      //     return item.groupId;
      //   });
      //   return ownerGroupsId;
      // }
      // const findGroup = await this.prisma.userMapOrganizeGroup.findMany({
      //   where: {
      //     users: { is: { userId: userId } },
      //     groupId: { notIn: filterGroupId },
      //   },
      //   select: {
      //     groupId: true,
      //   },
      // });
      const groupIds1 = masterGroup.userGroup.map((item) => item.groupId);
      const groupIds2 = resUser.userMapOrganizeGroup.map(
        (item) => item.groupId,
      );

      const combinedGroupIds = [...new Set([...groupIds1, ...groupIds2])];
      const groupRelatedAll = this.findAllRelatedGroupRows(combinedGroupIds);
      // const useridAll = await this.prisma.users.findMany({
      //   where: {
      //     OR: [
      //       { userId: userId },
      //       {
      //         userMapOrganizeGroupOwner: {
      //           some: {
      //             ownerGroupId: { in: findGroup.map((item) => item.groupId) },
      //           },
      //         },
      //       },
      //     ],
      //   },
      // });

      return groupRelatedAll;
    } else {
      return [];
    }
  }
  //Owner Group
  async getOwnerGroupByUserId(userId: string) {
    const userdetaill = await this.prisma.users.findFirst({
      where: { userId: userId },
    });
    if (userdetaill) {
      return await this.prisma.userGroup.findFirst({
        where: { groupId: userdetaill.ownerGroupId },
      });
    } else {
      return undefined;
    }
  }

  //ดึง Group ที่เข้าถึงได้โดย User Id
  async getAccessedGroupByUserId(moduleCode: string, userId: string) {
    const userdetaill = await this.prisma.users.findFirst({
      where: { userId: userId },
    });
    if (userdetaill) {
      const permission = await this.prisma.userPermissionGroup.findFirst({
        where: {
          userGroupId: userdetaill.ownerGroupId,
          userModule: { code: moduleCode },
        },
      });
      if (permission && permission.permissionGroupIds) {
        return await this.prisma.userGroup.findMany({
          where: { groupId: { in: permission.permissionGroupIds } },
        });
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  //ดึง Users ที่เข้าถึงได้โดย User Id
  async getAccessedUsersByUserId(moduleCode: string, userId: string) {
    try {
      const userdetaill = await this.prisma.users.findFirst({
        where: { userId: userId },
      });

      if (userdetaill.ownerGroupId !== null) {
        const permissionGroup = await this.prisma.userPermissionGroup.findFirst(
          {
            where: {
              userGroupId: userdetaill.ownerGroupId,
              userModule: { code: moduleCode },
            },
          },
        );
        if (permissionGroup && permissionGroup.permissionGroupIds) {
          return await this.prisma.users.findMany({
            where: { ownerGroupId: { in: permissionGroup.permissionGroupIds } },
          });
        } else {
          return [];
        }
      }
    } catch (error) {
      console.error('Error in getAccessedUsersByUserId:', error);
      return [];
    }
  }
  //ดึง Group ที่เข้าถึงได้โดย Group Id
  async getAccessedGroupByGroupId(moduleCode: string, groupId: string) {
    const permission = await this.prisma.userPermissionGroup.findFirst({
      where: {
        userGroupId: groupId,
        userModule: { code: moduleCode },
      },
    });
    if (permission && permission.permissionGroupIds) {
      return await this.prisma.userGroup.findMany({
        where: { groupId: { in: permission.permissionGroupIds } },
      });
    } else {
      return [];
    }
  }
  //ดึง Users ที่เข้าถึงได้โดย Group Id
  async getAccessedUsersByGroupId(moduleCode: string, groupId: string) {
    const permissionGroup = await this.prisma.userPermissionGroup.findFirst({
      where: {
        userGroupId: groupId,
        userModule: { code: moduleCode },
      },
    });
    if (permissionGroup.permissionGroupIds) {
      return await this.prisma.users.findMany({
        where: { ownerGroupId: { in: permissionGroup.permissionGroupIds } },
      });
    } else {
      return [];
    }
  }
  //ดึง Group ที่มีสิทธิ์เข้าถึงข้อมูล โดย User Id
  async getLeadGroupByUserId(moduleCode: string, userId: string) {
    const userdetaill = await this.prisma.users.findFirst({
      where: { userId: userId },
    });
    const permission = await this.prisma.userPermissionGroup.findMany({
      where: {
        permissionGroupIds: { hasSome: [userdetaill.ownerGroupId] },
        userModule: { code: moduleCode },
      },
    });
    if (permission.length > 0) {
      const groupIds = permission.map((data) => data.userGroupId);
      return await this.prisma.userGroup.findMany({
        where: { groupId: { in: groupIds } },
      });
    } else {
      return [];
    }
  }
  //ดึง Users ที่มีสิทธิ์เข้าถึงข้อมูล โดย User Id
  async getLeadUsersByUserId(moduleCode: string, userId: string) {
    const userdetaill = await this.prisma.users.findFirst({
      where: { userId: userId },
    });
    const permission = await this.prisma.userPermissionGroup.findMany({
      where: {
        permissionGroupIds: {
          hasSome: userdetaill.ownerGroupId ? [userdetaill.ownerGroupId] : [],
        },
        userModule: { code: moduleCode },
      },
    });
    if (permission.length > 0) {
      const groupIds = permission.map((data) => data.userGroupId);
      return await this.prisma.users.findMany({
        where: { ownerGroupId: { in: groupIds } },
      });
    } else {
      return [];
    }
  }

  //ดึง Group ที่มีสิทธิ์เข้าถึงข้อมูล โดย Group Id
  async getLeadGroupByGroupId(moduleCode: string, groupId: string) {
    const permission = await this.prisma.userPermissionGroup.findMany({
      where: {
        permissionGroupIds: { hasSome: [groupId] },
        userModule: { code: moduleCode },
      },
    });
    if (permission.length > 0) {
      const groupIds = permission.map((data) => data.userGroupId);
      return await this.prisma.userGroup.findMany({
        where: { groupId: { in: groupIds } },
      });
    } else {
      return [];
    }
  }
  //ดึง Users ที่มีสิทธิ์เข้าถึงข้อมูล โดย Group Id
  async getLeadUsersByGroupId(moduleCode: string, groupId: string) {
    const permission = await this.prisma.userPermissionGroup.findMany({
      where: {
        permissionGroupIds: { hasSome: [groupId] },
        userModule: { code: moduleCode },
      },
    });
    if (permission.length > 0) {
      const groupIds = permission.map((data) => data.userGroupId);
      return await this.prisma.users.findMany({
        where: { ownerGroupId: { in: groupIds } },
      });
    } else {
      return [];
    }
  }
  async findAllRelatedGroupRows(idList: string[]) {
    const result = [];
    const groupList = [...idList];
    while (groupList.length > 0) {
      const currentId = groupList.pop();

      // Fetch the node and its direct children
      const cerentRow = (await this.prisma.userGroup.findFirst({
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
  //หา User จาก Token
  async findUserByToken(token: string) {
    return this.prisma.users.findFirst({
      where: { token: token },
    });
  }
}
