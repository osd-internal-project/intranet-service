import { Injectable } from '@nestjs/common';
import { RoleProfileMapRepository, UserRoleRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRoleService {
  constructor(
    private userRoleRepo: UserRoleRepository,
    private roleProfileMapRepo: RoleProfileMapRepository,
  ) {}

  create(data: Prisma.userRoleCreateInput) {
    const condition = { data: data } as Prisma.userRoleCreateArgs;
    return this.userRoleRepo.create(condition);
  }

  findAll() {
    return this.userRoleRepo.findAll();
  }

  findByCondition(condition: Prisma.userRoleFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userRoleRepo.findByCondition(condition);
  }

  async findOneByCondition(condition: Prisma.userRoleFindFirstArgs) {
    return this.userRoleRepo.findByCondition(condition);
  }

  async findRoleByRoleId(roleId: string) {
    const condition = {
      where: { roleId: roleId },
      select: {
        roleName: true,
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
    } as Prisma.userRoleArgs;
    return this.userRoleRepo.findByCondition(condition);
  }

  async update(roleId: string, data: Prisma.userRoleUpdateInput) {
    const condition = {
      where: { roleId: roleId },
      data: data,
    } as Prisma.userRoleUpdateArgs;
    return await this.userRoleRepo.update(condition);
  }

  async updateWithProfiles(
    roleId: string,
    data: Prisma.userRoleUpdateInput,
    profiles: Prisma.roleProfileMapCreateManyUserRoleInput[],
  ) {
    const condition = {
      where: { roleId: roleId },
      data: {
        ...data,
        roleProfileMap: { deleteMany: {}, createMany: { data: profiles } },
      },
    } as Prisma.userRoleUpdateArgs;
    return await this.userRoleRepo.update(condition);
  }

  async remove(roleId: string) {
    const checkUsed = (await this.userRoleRepo.findOne({
      where: { roleId: roleId },
      include: { userRoleMap: true },
    })) as any;
    if (checkUsed.userRoleMap && checkUsed?.userRoleMap.length > 0) {
      return {
        status: 401,
        message: `ไม่สามารถลบได้เนื่องจากมีผู้ใช้งาน'`,
      };
    }
    await this.roleProfileMapRepo.deleteMany({
      where: { userRoleId: roleId },
    });

    return await this.userRoleRepo.delete({
      where: { roleId: roleId },
    });
  }

  async createRoleProfileMap(data: Prisma.roleProfileMapCreateManyInput[]) {
    const condition = { data: data } as Prisma.roleProfileMapCreateManyArgs;
    return this.roleProfileMapRepo.createMany(condition);
  }

  setRole() {
    return this.userRoleRepo.create({
      data: {
        roleId: 'role0',
        roleName: 'all',
        roleProfileMap: { create: { profileRuleId: 'profile0' } },
      },
    });
  }
}
