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
    return await this.prisma.userGroup.findFirst({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
  }
  //Sale Group
  async getSaleUsersBySalePermission(userId: string) {
    const permissionGroup = await this.prisma.userGroup.findFirst({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    if (permissionGroup.saleUsersId.length > 0) {
      const userList = permissionGroup.saleUsersId;
      return userList;
    } else if (permissionGroup.saleUserGroupId.length > 0) {
      const allGroup = await this.findAllRelatedGroupRows(
        permissionGroup.saleUserGroupId,
      );
      const groups = await this.prisma.userMapOrganizeGroupOwner.findMany({
        where: { ownerGroupId: { in: allGroup } },
      });
      const userList = groups.map((group) => group.usersId);
      return userList;
    } else {
      return [];
    }
  }
  //Engineer Group
  async getEngineerUsersBySalePermission(userId: string) {
    const permissionGroup = await this.prisma.userGroup.findFirst({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    if (permissionGroup.engineerUsersId.length > 0) {
      const userList = permissionGroup.engineerUsersId;
      return userList;
    } else if (permissionGroup.engineerUserGroupId.length > 0) {
      const allGroup = await this.findAllRelatedGroupRows(
        permissionGroup.engineerUserGroupId,
      );
      const groups = await this.prisma.userMapOrganizeGroupOwner.findMany({
        where: { ownerGroupId: { in: allGroup } },
      });
      const userList = groups.map((group) => group.usersId);
      return userList;
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

  async getLeaveAccessedUsersByHeaderUserId(userId: string) {
    const owerGroup = await this.prisma.userGroup.findFirst({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    if (owerGroup) {
      const accessedGroup = await this.prisma.userGroupMapHeader.findMany({
        where: {
          OR: [
            {
              AND: [
                { leaveGroupId: { hasSome: owerGroup.groupId } },
                { leaveUserId: { isEmpty: true } },
              ],
            },
            { leaveUserId: { hasSome: userId } },
          ],
        },
      });
      const accessedGroupIds = accessedGroup.map((group) => group.userGroupId);
      if (accessedGroup.length > 0) {
        const accessedUsers =
          await this.prisma.userMapOrganizeGroupOwner.findMany({
            where: { ownerGroupId: { in: accessedGroupIds } },
          });
        const accessedUserIds = accessedUsers.map((user) => user.usersId);
        return accessedUserIds;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  async getExpenseAccessedUsersByHeaderUserId(userId: string) {
    const owerGroup = await this.prisma.userGroup.findFirst({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    if (owerGroup) {
      const accessedGroup = await this.prisma.userGroupMapHeader.findMany({
        where: {
          OR: [
            { expenseGroupId: { hasSome: owerGroup.groupId } },
            { expenseUserId: { hasSome: userId } },
          ],
        },
      });
      const accessedGroupIds = accessedGroup.map((group) => group.userGroupId);
      if (accessedGroup.length > 0) {
        const accessedUsers =
          await this.prisma.userMapOrganizeGroupOwner.findMany({
            where: { ownerGroupId: { in: accessedGroupIds } },
          });
        const accessedUserIds = accessedUsers.map((user) => user.usersId);
        return accessedUserIds;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  async getAccessedByHeaderUserIdAndType(
    headerUserId: string,
    processType: string,
  ) {
    const owerGroup = await this.prisma.userGroup.findFirst({
      where: { userMapOrganizeGroupOwner: { some: { usersId: headerUserId } } },
    });
    if (owerGroup) {
      const accessedGroup = await this.prisma.userGroupMapHeader.findMany({
        where: {
          type: processType,
          OR: [
            {
              AND: [
                { headerGroupId: { hasSome: owerGroup.groupId } },
                { headerUserId: { isEmpty: true } },
              ],
            },
            { headerUserId: { hasSome: headerUserId } },
          ],
        },
      });
      const accessedGroupIds = accessedGroup.map((group) => group.userGroupId);
      if (accessedGroup.length > 0) {
        const accessedUsers =
          await this.prisma.userMapOrganizeGroupOwner.findMany({
            where: { ownerGroupId: { in: accessedGroupIds } },
          });
        const accessedUserIds = accessedUsers.map((user) => user.usersId);
        return accessedUserIds;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  async getHeaderGroupIdByUserId(userId: string, processType: string) {
    const userOwnerGroup = await this.getOwnerGroupByUserId(userId);
    const headerGroup = await this.prisma.userGroupMapHeader.findFirst({
      where: { userGroupId: userOwnerGroup.groupId, type: processType },
    });
    if (headerGroup) {
      return headerGroup.headerGroupId;
    } else {
      return [];
    }
  }
}
