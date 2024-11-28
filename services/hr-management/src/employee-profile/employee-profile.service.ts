import { Injectable } from '@nestjs/common';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { Prisma } from '@prisma/client';
import { EmployeeProfileRepository } from '@inventory/share';

@Injectable()
export class EmployeeProfileService {
  constructor(
    private readonly employeeprofileRepo: EmployeeProfileRepository,
  ) {}

  create(createEmployeeProfile: Prisma.employeeProfilesCreateInput) {
    const condition: Prisma.employeeProfilesCreateArgs = {
      data: {
        ...createEmployeeProfile,
      },
    };
    return this.employeeprofileRepo.create(condition);
  }

  findAll() {
    return this.employeeprofileRepo.findAll;
  }

  findMany(take: number, skip: number) {
    const condition: Prisma.employeeProfilesFindManyArgs = {
      take: take,
      skip: skip,
      orderBy: {
        empId: 'desc',
      },
    };
    return this.employeeprofileRepo.findMany(condition);
  }

  findOne(userId: string) {
    const condition: Prisma.employeeProfilesFindFirstArgs = {
      where: {
        userId: userId,
      },
    };
    return this.employeeprofileRepo.findOne(condition);
  }

  update(
    id: number,
    updateEmployeeProfilesUpdateInput: Prisma.employeeProfilesUpdateInput,
  ) {
    const condition: Prisma.employeeProfilesUpdateArgs = {
      where: {
        id: id,
      },
      data: {
        ...updateEmployeeProfilesUpdateInput,
      },
    };
    return this.employeeprofileRepo.update(condition);
  }

  remove(id: number) {
    const condition: Prisma.employeeProfilesDeleteArgs = {
      where: {
        id: id,
      },
    };
    return this.employeeprofileRepo.delete(condition);
  }
}
