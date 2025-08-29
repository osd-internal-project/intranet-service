import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, CreateUserId24Dto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '@inventory/share';
import { UserType } from './type';

import { Id24Service, IdCheckingData } from 'src/id24/id24.service';
import config from '../configs';
import * as bcrypt from 'bcrypt';
import { promises as fs } from 'fs';
import { Prisma } from '@prisma/client';
const { masterGroupId24 } = config();
import * as nodemailer from 'nodemailer';

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
      username: createUserDto.username.replace(/\s/g, '').toLowerCase(),
      email: createUserDto.email.replace(/\s/g, ''),
      group: [createUserDto.dataModule, masterGroupId24],
      active: true,
      type: createUserDto.userType,
      ldapQuery: createUserDto.ldapQuery,
      phone: '',
    } as CreateUserId24Dto;
    console.log('before create in id 24');
    const id24Service =
      createUserDto.userType === UserType.LDAP
        ? this.id24Service.createUserLdap(createId24)
        : this.id24Service.createUser(createId24);
    console.log('create in id 24');
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
          extension: createUserDto.extension,
          organizedGroupId: '',
          userType: createUserDto.userType,
          startWork: createUserDto.startWork,
          token: response.data.id,
          dataModule: createUserDto.dataModule,
          empId: createUserDto.empId,
          ownerGroup: { connect: { groupId: createUserDto.ownerGroupId } },
          masterPosition: {
            connect: { posId: createUserDto.masterPositionId },
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
    let search = {};
    if (query.positionName) {
      search = {
        ...search,
        masterPosition: {
          is: { id: +query.positionName },
        },
      };
    }
    if (query.empId) {
      search = { ...search, empId: { contains: query.empId } };
    }
    if (query.username) {
      search = { ...search, username: { contains: query.username } };
    }
    if (query.fullname) {
      const names = query.fullname.trim().split(' ').filter(Boolean);
      const orConditions = names.flatMap((word) => [
        {
          firstNameTh: {
            contains: word,
            mode: 'insensitive',
          },
        },
        {
          lastNameTh: {
            contains: word,
            mode: 'insensitive',
          },
        },
      ]);
      search = { ...search, OR: orConditions };
    }

    if (query.positionId) {
      search = { ...search, masterPositionId: query.positionId };
    }

    const total = await this.usersRepo.count({ where: search });
    const data = await this.usersRepo.findMany({
      where: { ...search, activeStatus: true },
      select: {
        id: true,
        userId: true,
        userType: true,
        username: true,
        email: true,
        extension: true,
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
        ownerGroupId: true,
        ownerGroup: { select: { groupId: true, groupName: true } },
        startWork: true,
        imageId: true,
        createdAt: true,
        empId: true,
      },
      skip: +query.skip,
      take: +query.take,
      orderBy: {
        empId: 'asc',
      },
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
        masterPosition: {
          select: {
            posId: true,
            nameEn: true,
          },
        },
        ownerGroupId: true,
        ownerGroup: {
          select: {
            groupId: true,
            groupName: true,
          },
        },
        startWork: true,
        dataModule: true,
        imageId: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async updateImage(userId: string, imageId: string) {
    const user = await this.usersRepo.findOne({ where: { userId: userId } });
    if (user.imageId && imageId) {
      console.log('Deleting old image:', user.imageId);
      await fs.unlink(
        `${process.env.PATH_MOUNTDIR_UPLOAD}/users-image/${user.imageId}`,
      );
      console.log('Old image deleted successfully');
    }
    if (user) {
      return await this.usersRepo.update({
        where: { userId: user.userId },
        data: {
          imageId: imageId ? imageId : null,
        },
      });
    }
  }

  async update(userId: string, createUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepo.findOne({ where: { userId: userId } });
      if (user) {
        return await this.usersRepo.update({
          where: { userId: user.userId },
          data: {
            username: createUserDto.username,
            firstNameTh: createUserDto.firstNameTh,
            lastNameTh: createUserDto.lastNameTh,
            firstNameEn: createUserDto.firstNameEn,
            lastNameEn: createUserDto.lastNameEn,
            email: createUserDto.email,
            phoneNumber: createUserDto.phoneNumber,
            extension: createUserDto.extension,
            activeStatus: createUserDto.activeStatus,
            organizedGroupId: '',
            userType: createUserDto.userType,
            dataModule: createUserDto.dataModule,
            ownerGroupId: createUserDto.ownerGroupId,
            positionId: createUserDto.masterPositionId,
            startWork: createUserDto.startWork,
            empId: createUserDto.empId,
          },
        });
      }
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: 'An error occurred while creating the user',
        error: error,
      };
    }
  }

  async processAfterLoginAuth(token: string) {
    try {
      const user = await this.usersRepo.findOne({
        where: { token: token },
        include: { masterPosition: true, ownerGroup: true },
      });
      const id24Users = (await this.id24Service.getId24UsersAll(
        token,
      )) as any[];
      const id24 = await id24Users.find((id24User) => id24User.id === token);
      if (id24) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash('osd_P@ssw0rd', saltOrRounds);
        const user = await this.usersRepo.findOne({
          where: { username: id24.username.toLowerCase() },
        });
        if (user.token !== id24.id) {
          await this.sendmailForCreateRolesInId24(user);
        }
        if (!user) {
          const newUser = await this.usersRepo.create({
            data: {
              token: id24.id,
              username: id24.username.toLowerCase(),
              email: id24.email,
              password: hashedPassword,
              userType: 'ldap',
            },
          });
          return newUser;
        } else {
          const updateUser = await this.usersRepo.update({
            where: { userId: user.userId },
            include: { ownerGroup: true, masterPosition: true },
            data: {
              token: id24.id,
              password: hashedPassword,
              userType: 'ldap',
            },
          });
          return updateUser;
        }
      } else {
        await this.sendmailForCreateRolesInId24(user);
        return user;
      }
    } catch (err) {
      Logger.error(err);
      return;
    }
  }

  async sendmailForCreateRolesInId24(user: Prisma.usersCreateInput) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // ใช้ SMTP ของ Outlook (Microsoft 365)
      port: 587, // พอร์ตสำหรับ TLS (STARTTLS)
      secure: false, // ใช้ STARTTLS (ไม่ใช่ SSL ทันที)
      auth: {
        user: 'internalsupport@osd.co.th', // อีเมลผู้ส่ง
        pass: 'Internal-support@osd1234.', // รหัสผ่าน (หรือ App Password ถ้าเปิด 2FA)
      },
    });
    return await transporter.sendMail({
      from: '"admin Intranet" <internalsupport@osd.co.th>',
      to: `wasmeej@osd.co.th`,
      subject: 'ใส่ Role ให้พนักงานในระบบ ID24',
      text: '',
      html: `<p>เรียน วัสมี จาหลง</p>
            <p>กรุณาใส่ Role ให้พนักงานในระบบ ID24 ตามที่ได้แจ้งไว้ในระบบ Intranet</p>
            <p>รายละเอียด:</p>
            <p>ชื่อ: ${user.firstNameTh} ${user.lastNameTh}</p>
            <p>ขอบคุณครับ</p>
            <p>ทีมงาน Intranet</p>`,
    });
  }
}
