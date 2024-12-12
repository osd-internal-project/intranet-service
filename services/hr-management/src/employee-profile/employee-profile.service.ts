import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  EducationInformationsRepository,
  EmergencyContactRepository,
  EmployeeProfileRepository,
  ExperienceInformationsRepository,
  FamilyInformationsRepository,
  PersonalInformationsRepository,
} from '@inventory/share';

@Injectable()
export class EmployeeProfileService {
  constructor(
    private readonly employeeprofileRepo: EmployeeProfileRepository,
    private readonly personalinformationsRepo: PersonalInformationsRepository,
    private readonly emergencycontactRepo: EmergencyContactRepository,
    private readonly familyinformationsRepo: FamilyInformationsRepository,
    private readonly educationinformationsRepo: EducationInformationsRepository,
    private readonly experienceinformationsRepo: ExperienceInformationsRepository,
  ) {}

  async create(createEmployeeProfile: any) {
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
        status: true,
      },
    };
    const data = await this.employeeprofileRepo.create(condition);

    if (
      Array.isArray(createEmployeeProfile.personalInformation) &&
      createEmployeeProfile.personalInformation.length > 0
    ) {
      await this.personalinformationsRepo.create({
        data: {
          ...createEmployeeProfile.personalInformation[0],
          userId: data.userId,
        },
      });
    }
    if (
      Array.isArray(createEmployeeProfile.emergencyContact) &&
      createEmployeeProfile.emergencyContact.length > 0
    ) {
      createEmployeeProfile.emergencyContact.map(
        async (record: any, index: number) => {
          await this.emergencycontactRepo.create({
            data: { ...record, userId: data.userId },
          });
        },
      );
    }
    if (
      Array.isArray(createEmployeeProfile.familyInformations) &&
      createEmployeeProfile.familyInformations.length > 0
    ) {
      createEmployeeProfile.familyInformations.map(
        async (record: any, index: number) => {
          await this.familyinformationsRepo.create({
            data: { ...record, userId: data.userId },
          });
        },
      );
    }
    if (
      Array.isArray(createEmployeeProfile.educationInformations) &&
      createEmployeeProfile.educationInformations.length > 0
    ) {
      createEmployeeProfile.educationInformations.map(
        async (record: any, index: number) => {
          await this.educationinformationsRepo.create({
            data: { ...record, userId: data.userId },
          });
        },
      );
    }
    if (
      Array.isArray(createEmployeeProfile.experienceInformations) &&
      createEmployeeProfile.experienceInformations.length > 0
    ) {
      createEmployeeProfile.experienceInformations.map(
        async (record: any, index: number) => {
          await this.experienceinformationsRepo.create({
            data: { ...record, userId: data.userId },
          });
        },
      );
    }

    return { status: data ? 200 : 500, data: data ? data : null };
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
