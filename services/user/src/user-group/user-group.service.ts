import { Injectable } from '@nestjs/common';
import {
  AccessService,
  OrganizedRepository,
  UserGroupRepository,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupService {
  constructor(
    private userGroupRepo: UserGroupRepository,
    private usersRepo: UsersRepository,
    private organizedRepo: OrganizedRepository,
    private accessServices: AccessService,
  ) {}

  create(data: any) {
    const condition = {
      data: {
        groupName: data.groupName,
        description: data.description,
        parentGroupId: data.parentGroupId,
        organizedGroupId: data.organizeId,
        organizeMapGroup: {
          create: {
            organizedId: data.organizeId,
          },
        },
      },
    } as Prisma.userGroupCreateArgs;
    return this.userGroupRepo.create(condition);
  }

  findAll() {
    return this.userGroupRepo.findAll();
  }

  findByCondition(condition: Prisma.userGroupFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userGroupRepo.findByCondition(condition);
  }
  async findOwnerFormOrganizedByUser(userId: string) {
    const organize = await this.organizedRepo.findOne({
      where: { userMapOrganizeGroupOwner: { some: { usersId: userId } } },
    });
    return this.organizedRepo.findOne({
      where: { organizedId: organize.organizedId },
      select: { organizeMapGroup: { select: { group: true } } },
    });
  }
  async findGroupByModuleidAndGroupid(condition: {
    groupid: string;
    modulecode: string;
  }) {
    const { groupid, modulecode } = condition;
    return await this.accessServices.getAccessedGroupByGroupId(
      modulecode,
      groupid,
    );
  }
  findByOrganizeId(organizeId: string) {
    return this.organizedRepo.findOne({
      where: { organizedId: organizeId },
      select: { organizeMapGroup: { select: { group: true } } },
    });
  }
  async findOneByCondition(condition: Prisma.userGroupFindFirstArgs) {
    condition = {
      ...condition,
    };
    const data = await this.userGroupRepo.findOne(condition);
    return data;
  }

  findChildGroupByGropId(groupId: string) {
    const condition = {
      where: { parentGroupId: groupId },
    };
    return this.userGroupRepo.findByCondition(condition);
  }

  findUserByGropId(groupId: string) {
    return this.usersRepo.findByCondition({ where: { ownerGroupId: groupId } });
  }

  /**
   * แก้ไขข้อมูลของกลุ่มผู้ใช้งาน (ชื่อและคำอธิบายเท่านั้น)
   * การผูกสิทธิ์ของกลุ่มไม่ได้จัดการที่นี่ — ใช้ /user-map-role-group แทน
   * @param groupId groupId ของกลุ่มที่ต้องการแก้ไข
   * @param data ข้อมูลที่ต้องการแก้ไข
   * @returns ข้อมูลกลุ่มหลังแก้ไข
   */
  async update(
    groupId: string,
    data: {
      groupName: string;
      description?: string;
    },
  ) {
    const condition: Prisma.userGroupUpdateArgs = {
      where: { groupId: groupId },
      data: {
        groupName: data.groupName,
        description: data.description,
        updatedAt: new Date(),
      },
    };
    return await this.userGroupRepo.update(condition);
  }
  async updatePermission(groupId: string, data) {
    const condition = {
      where: { groupId: groupId },
      data: data,
    } as Prisma.userGroupUpdateArgs;
    return await this.userGroupRepo.update(condition);
  }
  async remove(groupId: string) {
    const condition = {
      where: { groupId: groupId },
    } as Prisma.userGroupDeleteArgs;
    await this.userGroupRepo.delete(condition);
  }
}
