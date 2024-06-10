import { Injectable, Logger } from '@nestjs/common';
import {
  UserRepository,
  UserGroupMapRepository,
  UserRoleMapRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  usersService: any;
  constructor(
    private userRepo: UserRepository,
    private userRoleMapRepo: UserRoleMapRepository,
    private userGroupMapRepo: UserGroupMapRepository,
  ) {}

  create(data: Prisma.userCreateInput) {
    const condition = { data: data } as Prisma.userCreateArgs;
    return this.userRepo.create(condition);
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
    return this.userRepo.findAll();
  }

  findByCondition(condition: Prisma.userFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    };

    return this.userRepo.findByCondition(condition);
  }

  findOneByCondition(condition: Prisma.userFindFirstArgs) {
    condition = {
      ...condition,
      include: {
        masterPosition: true,
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    };
    return this.userRepo.findOne(condition);
  }
  findByUsername(username: string) {
    const condition = { where: { username: username } } as Prisma.userArgs;
    return this.userRepo.findOne(condition);
  }
  findByUserId(userId: string) {
    const condition = { where: { userId: userId } } as Prisma.userArgs;
    return this.userRepo.findOne(condition);
  }
  async update(userId: string, data: Prisma.userUpdateInput) {
    const condition = {
      where: { userId: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    } as Prisma.userUpdateArgs;
    return await this.userRepo.update(condition);
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    const condition = {
      where: { userId: userId },
      data: { refreshToken: refreshToken },
    } as Prisma.userUpdateArgs;
    // Logger.warn(condition);
    return await this.userRepo.update(condition);
  }

  async remove(userId: string) {
    const condition = { where: { userId: userId } } as Prisma.userDeleteArgs;
    console.log(condition);
    return await this.userRepo.delete(condition);
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
    return this.userRepo.create({
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
    return this.userRepo.create({
      data: {
        username: userDetails.username,
        password: pass,
        email: `${userDetails.username}@osd.co.th`,
      },
    });
  }
}
