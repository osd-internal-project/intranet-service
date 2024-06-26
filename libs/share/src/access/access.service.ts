import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}
  async getOwnerGroupId(userId: string) {
    const resUser: any = await this.prisma.users.findFirst({
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
      });

      if (masterGroup.parentGroupId === null) {
        const ownerGroupAll = await this.prisma.userGroup.findMany({});
        const ownerGroupsId = ownerGroupAll.map((item) => {
          return item.groupId;
        });
        return ownerGroupsId;
      }

      const findGroup = await this.prisma.userMapOrganizeGroup.findMany({
        where: {
          users: { is: { userId: userId } },
          groupId: { notIn: filterGroupId },
        },
        select: {
          groupId: true,
        },
      });

      const groupIds1 = findGroup.map((item) => item.groupId);
      const groupIds2 = resUser.userMapOrganizeGroup.map(
        (item) => item.groupId,
      );
      const combinedGroupIds = [...new Set([...groupIds1, ...groupIds2])];
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

      return combinedGroupIds;
    } else {
      return [];
    }
  }
}
