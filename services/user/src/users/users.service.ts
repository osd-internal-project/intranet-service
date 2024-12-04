import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, CreateUserId24Dto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '@inventory/share';
import { UserType } from './type';
import { Id24Service, IdCheckingData } from 'src/id24/id24.service';
import config from '../configs';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const { masterGroupId24 } = config();

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepository,
    private id24Service: Id24Service,
  ) {}

  dateToStartofDay(data: Date) {
    const date = new Date(data);
    const result = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0,
    ).toISOString();
    return result;
  }

  dateToEndofDay(data: Date) {
    const date = new Date(data);
    const result = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      0,
    ).toISOString();
    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password.trim(),
      saltOrRounds,
    );
    const createId24 = {
      username: createUserDto.username.replace(/\s/g, ''),
      email: createUserDto.email.replace(/\s/g, ''),
      group: [createUserDto.dataModule, masterGroupId24],
      active: true,
      type: createUserDto.userType,
      ldapQuery: createUserDto.ldapQuery,
      phone: '',
    } as CreateUserId24Dto;

    const id24Service =
      createUserDto.userType === UserType.LDAP
        ? this.id24Service.createUserLdap(createId24)
        : this.id24Service.createUser(createId24);
    try {
      const response = await id24Service;
      Logger.debug(`User created successfully on id24`, response.data.id);
      if (createUserDto.userType !== UserType.LDAP) {
        await this.id24Service.resetPassword(
          response.data.id,
          createUserDto.password,
        );
        Logger.debug(
          `User resetPassword successfully on id24`,
          response.data.id,
        );
      } else {
        await this.id24Service.updateGroup(response.data.id, [
          createUserDto.dataModule,
          masterGroupId24,
        ]);
      }

      await this.id24Service.updateActive(
        response.data.id,
        createUserDto.activeStatus,
      );

      const user = await this.usersRepo.create({
        data: {
          username: createUserDto.username,
          password: hashedPassword,
          firstNameTh: createUserDto.firstNameTh,
          lastNameTh: createUserDto.lastNameTh,
          firstNameEn: createUserDto.firstNameEn,
          lastNameEn: createUserDto.lastNameEn,
          email: createUserDto.email,
          phoneNumber: createUserDto.phoneNumber,
          activeStatus: createUserDto.activeStatus,
          organizedGroupId: '',
          userType: createUserDto.userType,
          token: response.data.id,
          dataModule: createUserDto.dataModule,
          ownerGroup: { connect: { groupId: createUserDto.groupOwnerId } },
          masterPosition: {
            connect: { posId: createUserDto.masterPositionId },
          },
          userGroupMap: {
            createMany: {
              data: createUserDto.groupList.map((item: string) => ({
                userGroupId: item,
              })),
              skipDuplicates: true,
            },
          },
          userMapOrganizeChart: {
            createMany: {
              data: {
                positionId: createUserDto.departmentId,
              },
              skipDuplicates: true,
            },
          },
        },
      });
      Logger.debug(`User created successfully on service`, response.data.id);
      return {
        success: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'An error occurred while creating the user',
        error: error,
      };
    }
  }

  async findAll(query: any) {
    let search;
    if (query.userId) {
      search = { ...search, userId: { contains: query.userId } };
    }
    if (query.userName) {
      search = { ...search, username: { contains: query.userName } };
    }
    if (query.phoneNumber) {
      search = { ...search, phoneNumber: { contains: query.phoneNumber } };
    }
    if (query.email) {
      search = { ...search, email: { contains: query.email } };
    }
    if (query.firstNameTh) {
      search = { ...search, firstNameTh: { contains: query.firstNameTh } };
    }
    if (query.lastNameTh) {
      search = { ...search, lastNameTh: { contains: query.lastNameTh } };
    }
    if (query.activeStatus !== null || query.activeStatus !== undefined) {
      search = { ...search, activeStatus: query.activeStatus };
    }
    if (query.positionId) {
      search = { ...search, masterPositionId: query.positionId };
    }
    if (query.created) {
      search = {
        ...search,
        createdAt: {
          gte: this.dateToStartofDay(query.created[0]),
          lte: this.dateToEndofDay(query.created[1]),
        },
      };
    }
    const total = await this.usersRepo.count({ where: search });
    const data = await this.usersRepo.findMany({
      where: search,
      select: {
        id: true,
        userId: true,
        userType: true,
        username: true,
        email: true,
        activeStatus: true,
        departmentId: true,
        firstNameTh: true,
        lastNameTh: true,
        firstNameEn: true,
        lastNameEn: true,
        ldapQuery: true,
        phoneNumber: true,
        masterPosition: true,
        userMapOrganizeChart: true,
        userMapOrganizeGroupOwner: true,
        dataModule: true,
        positionId: true,
      },
      skip: +query.skip,
      take: +query.take,
    });
    return {
      total: total,
      data: data,
    };
  }

  async getGroups() {
    return await this.id24Service.getGroups(
      '6c692c98-1899-4cf0-ab32-b4f76e42409a',
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUserName(
    username: string,
    type: UserType.LDAP | UserType.Local,
  ) {
    const duplicatedUser = await this.usersRepo.findOne({
      where: {
        userType: type,
        username: { equals: username, mode: 'insensitive' },
      },
    });
    if (duplicatedUser) {
      return {
        statusCode: 200,
        message: 'This username already exists.',
        error: 'Bad Request',
      };
    }
  }

  async validateCheck(body: IdCheckingData) {
    return await this.id24Service.validateCheck({
      username: body.username,
      email: body.email,
      type: body.type,
    });
  }

  async validateEmail(email: string) {
    const duplicatedEmail = await this.usersRepo.findOne({
      where: {
        email: { equals: email, mode: 'insensitive' },
      },
    });
    if (duplicatedEmail) {
      return {
        statusCode: 200,
        message: 'This email already exists.',
        error: 'Bad Request',
      };
    }
  }

  async validatePassword(password: string) {
    return this.id24Service.validatePassword(password);
  }

  findByToken(token: string) {
    return this.usersRepo.findOne({
      where: { token: token },
      select: {
        id: true,
        userId: true,
        username: true,
        firstNameTh: true,
        lastNameTh: true,
        token: true,
        phoneNumber: true,
        email: true,
        userType: true,
        createdAt: true,
        updatedAt: true,
        ldapQuery: true,
        departmentId: true,
        ownerGroup: {
          select: {
            groupId: true,
            groupName: true,
          },
        },
        userGroupMap: {
          select: {
            userGroup: {
              select: {
                groupId: true,
                groupName: true,
              },
            },
          },
        },
        dataModule: true,
      },
      orderBy: { id: 'asc' },
    });
  }
  // async validateEmail(email: string) {
  //   const duplicatedEmail = await this.userRepo.findFirst({
  //     where: {
  //       email: { equals: email, mode: 'insensitive' },
  //     },
  //   });
  //   if (duplicatedEmail) {
  //     return {
  //       statusCode: 200,
  //       message: 'This email already exists.',
  //       error: 'Bad Request',
  //     };
  //   }
  // }

  // async validateLicense(status: string) {
  //   const checkLicense = await this.userRepo.count({ where: { active: true } });

  //   if (status === 'create') {
  //     if (checkLicense >= +userLicense) {
  //       return {
  //         statusCode: 200,
  //         message: `Users active max in ${userLicense} license`,
  //         error: 'Bad Request',
  //       };
  //     }
  //   } else {
  //     if (checkLicense >= +userLicense) {
  //       return {
  //         statusCode: 200,
  //         message: `Users active max in ${userLicense} license`,
  //         error: 'Bad Request',
  //       };
  //     }
  //   }
  // }

  // async validatePassword(password: string) {
  //   return this.id24Service.validatePassword(password);
  // }
}
