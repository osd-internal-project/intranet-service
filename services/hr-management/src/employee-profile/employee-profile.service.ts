import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  EmployeeProfileRepository,
  PersonalInformationsRepository,
} from '@inventory/share';

@Injectable()
export class EmployeeProfileService {
  constructor(
    private readonly employeeprofileRepo: EmployeeProfileRepository,
    private readonly personalinformationsRepo: PersonalInformationsRepository, // private readonly personalinformationsRepo: PersonalInformationsRepository, // private readonly personalinformationsRepo: PersonalInformationsRepository, // private readonly personalinformationsRepo: PersonalInformationsRepository,
  ) {}

  async create(createEmployeeProfile: any) {
    console.log(createEmployeeProfile);
    let personalInformation;
    if (
      Array.isArray(createEmployeeProfile.personalInformation) &&
      createEmployeeProfile.personalInformation.length > 0
    ) {
      personalInformation = this.personalinformationsRepo.create({
        data: { ...createEmployeeProfile.personalInformation[0] },
      });
    }

    let emergencyContact;

    if (
      Array.isArray(createEmployeeProfile.emergencyContact) &&
      createEmployeeProfile.emergencyContact.length > 0
    ) {
      personalInformation = this.personalinformationsRepo.create({
        data: { ...createEmployeeProfile.personalInformation[0] },
      });
    }

    const condition: Prisma.employeeProfilesCreateArgs = {
      data: {
        empId: createEmployeeProfile.empId,
        idCard: createEmployeeProfile.idCard,
        username: createEmployeeProfile.username,
        firstNameTH: createEmployeeProfile.firstNameTH,
        lastNameTH: createEmployeeProfile.lastNameTH,
        firstNameEN: createEmployeeProfile.firstNameEN,
        lastNameEN: createEmployeeProfile.lastNameEN,
        birthDate: createEmployeeProfile.birthDate,
        gender: createEmployeeProfile.gender,
        address: createEmployeeProfile.address,
        email: createEmployeeProfile.email,
        phoneNumber: createEmployeeProfile.phoneNumber,
        extensionNumber: createEmployeeProfile.extensionNumber,
        startWork: createEmployeeProfile.startWork,
        promotionStatus: createEmployeeProfile.promotionStatus,
        masterPosition: {
          connect: { posId: createEmployeeProfile.positionId },
        },
        department: {
          connect: { id: createEmployeeProfile.departmentId },
        },
        personalInformations: {
          connect: { id: personalInformation.id },
        },
        status: true,
      },
    };
    // const data = await this.employeeprofileRepo.create(condition);

    // return { status: data ? 200 : 500, data: data ? data : null };
  }

  async uploadImags(userId: string, files: Express.Multer.File) {
    return await this.employeeprofileRepo.update({
      where: {
        userId: userId,
      },
      data: {
        imageId: files.filename,
      },
    });
  }

  findAll() {
    return this.employeeprofileRepo.findAll();
  }

  findMany(take: number, skip: number) {
    const condition: Prisma.employeeProfilesFindManyArgs = {
      take: take,
      skip: skip,
      include: {
        department: true,
        masterPosition: true,
      },
      orderBy: {
        id: 'desc',
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
        status: true,
      },
    };
    const conditionStatusInActive: Prisma.employeeProfilesCountArgs = {
      where: {
        status: false,
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
