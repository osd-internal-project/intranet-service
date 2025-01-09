import { Injectable, Logger } from '@nestjs/common';
import { UserGroupMapPermissionRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserGroupMapPermissionService {
  constructor(
    private userGroupMapPermissionRepo: UserGroupMapPermissionRepository,
  ) {}

  create(data: Prisma.userGroupMapCreateInput) {
    const condition = { data: data } as Prisma.userGroupMapPermissionCreateArgs;
    Logger.debug('data:', data);
    return this.userGroupMapPermissionRepo.create(condition);
  }

  findAll() {
    return this.userGroupMapPermissionRepo.findAll();
  }

  findByCondition(condition: Prisma.userGroupMapPermissionFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userGroupMapPermissionRepo.findMany(condition);
  }

  update(id: number, data: Prisma.userGroupMapPermissionUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userGroupMapPermissionUpdateArgs;
    return this.userGroupMapPermissionRepo.update(condition);
  }

  async updatePermission(
    groupId: string,
    data: { headerGroupId: string[]; type: string },
  ) {
    const record = await this.userGroupMapPermissionRepo.findFirst({
      where: { type: data.type, userGroupId: groupId },
    });
    if (record) {
      const condition = {
        where: { userGroupId: groupId, type: data.type },
        data: data,
      } as Prisma.userGroupMapPermissionUpdateArgs;
      console.log(groupId);
      console.log(data);
      return await this.userGroupMapPermissionRepo.updateMany(condition);
    } else {
      const condition = {
        data: { userGroupId: groupId, ...data },
      } as Prisma.userGroupMapPermissionCreateArgs;
      console.log(groupId);
      console.log(data);
      return await this.userGroupMapPermissionRepo.create(condition);
    }
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userGroupMapPermissionDeleteArgs;
    return await this.userGroupMapPermissionRepo.delete(condition);
  }

  async findGrouplistByUserId(userId: string) {
    const condition = {
      where: { userId: userId },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    } as Prisma.userGroupMapPermissionFindManyArgs;
    const group = await this.userGroupMapPermissionRepo.findMany(condition);
    const grouplist = [];
    group.map((item) => grouplist.push(item.userGroupId));

    return grouplist;
  }
}
