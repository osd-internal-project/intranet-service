import { Injectable, Logger } from '@nestjs/common';
import {
  UserModuleRepository,
  UserPermissionGroupRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPermissionGroupService {
  constructor(
    private userPermissionGroupRepo: UserPermissionGroupRepository,
    private userModuleRepository: UserModuleRepository,
  ) {}

  create(data: Prisma.userPermissionGroupCreateInput) {
    const condition = { data: data } as Prisma.userPermissionGroupCreateArgs;

    return this.userPermissionGroupRepo.create(condition);
  }
  async set(req: {
    userGroupId: string;
    userModuleId: string;
    permissionGroupIds: string[];
  }) {
    const data = await this.userPermissionGroupRepo.findMany({
      where: {
        userGroupId: req.userGroupId,
        userModule: { code: req.userModuleId },
      },
    });
    if (data.length > 0) {
      return this.userPermissionGroupRepo.updateMany({
        where: {
          userGroupId: req.userGroupId,
          userModule: { code: req.userModuleId },
        },
        data: { permissionGroupIds: req.permissionGroupIds },
      });
    } else {
      const module = await this.userModuleRepository.findFirst({
        where: { code: req.userModuleId },
      });
      return await this.userPermissionGroupRepo.create({
        data: { ...req, userModuleId: module.id },
      });
    }
  }

  findAll() {
    return this.userPermissionGroupRepo.findAll();
  }

  findMany(condition: Prisma.userPermissionGroupWhereInput) {
    return this.userPermissionGroupRepo.findMany({
      where: { ...condition },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  update(id: number, data: Prisma.userPermissionGroupUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userPermissionGroupUpdateArgs;
    return this.userPermissionGroupRepo.update(condition);
  }

  // async updatePermission(
  //   groupId: string,
  //   data: { headerGroupId: string[]; type: string },
  // ) {
  //   const record = await this.userPermissionGroupRepo.findFirst({
  //     where: { type: data.type, userGroupId: groupId },
  //   });
  //   if (record) {
  //     const condition = {
  //       where: { userGroupId: groupId, type: data.type },
  //       data: data,
  //     } as Prisma.userPermissionGroupUpdateArgs;
  //     console.log(groupId);
  //     console.log(data);
  //     return await this.userPermissionGroupRepo.updateMany(condition);
  //   } else {
  //     const condition = {
  //       data: { userGroupId: groupId, ...data },
  //     } as Prisma.userPermissionGroupCreateArgs;
  //     console.log(groupId);
  //     console.log(data);
  //     return await this.userPermissionGroupRepo.create(condition);
  //   }
  // }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userPermissionGroupDeleteArgs;
    return await this.userPermissionGroupRepo.delete(condition);
  }

  async findGrouplistByUserId(userId: string) {
    const condition = {
      where: { userId: userId },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    } as Prisma.userPermissionGroupFindManyArgs;
    const group = await this.userPermissionGroupRepo.findMany(condition);
    const grouplist = [];
    group.map((item) => grouplist.push(item.userGroupId));

    return grouplist;
  }
}
