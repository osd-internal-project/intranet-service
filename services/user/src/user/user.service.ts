import { Injectable, Logger } from '@nestjs/common';
import {
  UsersRepository,
  UserGroupMapRepository,
  UserRoleMapRepository,
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

  findByCondition(condition: Prisma.usersFindManyArgs) {
    condition = {
      ...condition,
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
    console.log(condition);
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
}
