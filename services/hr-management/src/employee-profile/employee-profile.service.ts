import { Injectable } from '@nestjs/common';
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
    return this.employeeprofileRepo.findAll();
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

  async count(params: {
    valueOne: string;
    valueTwo: boolean;
    valueThree: boolean;
    valueFour: string;
  }) {
    const { valueTwo, valueThree, valueFour } = params;
    const conditionStatusActive: Prisma.employeeProfilesCountArgs = {
      where: {
        status: Boolean(valueTwo),
      },
    };
    const conditionStatusInActive: Prisma.employeeProfilesCountArgs = {
      where: {
        status: Boolean(valueThree),
      },
    };
    const conditionStatusPromotion: Prisma.employeeProfilesCountArgs = {
      where: {
        promotionStatus: { not: valueFour },
      },
    };
    const resultAll = await this.employeeprofileRepo.count({});
    const resultActive = await this.employeeprofileRepo.count(
      conditionStatusActive,
    );
    const resultInActive = await this.employeeprofileRepo.count(
      conditionStatusInActive,
    );
    const resultApproved = await this.employeeprofileRepo.count(
      conditionStatusPromotion,
    );
    return {
      status: 'success',
      total: resultAll,
      active: resultActive,
      inactive: resultInActive,
      new: resultApproved,
    };
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
