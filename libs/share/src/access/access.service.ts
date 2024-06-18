import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}
  async getAllUser(token: string) {
    const resUser: any = await this.prisma.users.findFirst({
      where: {
        userId: token,
      },
      select: {
        userMapOrganizeGroupOwner: {
          select: {
            ownerGroupId: true,
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
        const useridAll = await this.prisma.users.findMany({});
        const userIdList = useridAll.map((item) => {
          return item.userId;
        });

        return userIdList;
      }

      const findGroup = await this.prisma.userMapOrganizeGroup.findMany({
        where: {
          users: { is: { userId: token } },
          groupId: { notIn: filterGroupId },
        },
      });

      const useridAll = await this.prisma.users.findMany({
        where: {
          OR: [
            { userId: token },
            {
              userMapOrganizeGroupOwner: {
                some: {
                  ownerGroupId: { in: findGroup.map((item) => item.groupId) },
                },
              },
            },
          ],
        },
      });

      const userIdList = useridAll.map((item) => {
        return item.userId;
      });

      return userIdList;
    } else {
      return [];
    }
  }
}
