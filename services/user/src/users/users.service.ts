import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '@inventory/share';
import { UserType } from './type';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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
      skip: +query.skip,
      take: +query.take,
    });
    return {
      total: total,
      data: data,
    };
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
    const duplicatedEmail = await this.userRepo.findFirst({
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

  async validateLicense(status: string) {
    const checkLicense = await this.userRepo.count({ where: { active: true } });

    if (status === 'create') {
      if (checkLicense >= +userLicense) {
        return {
          statusCode: 200,
          message: `Users active max in ${userLicense} license`,
          error: 'Bad Request',
        };
      }
    } else {
      if (checkLicense >= +userLicense) {
        return {
          statusCode: 200,
          message: `Users active max in ${userLicense} license`,
          error: 'Bad Request',
        };
      }
    }
  }

  async validatePassword(password: string) {
    return this.id24Service.validatePassword(password);
  }
}
