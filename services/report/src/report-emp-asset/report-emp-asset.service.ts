import {
  employeePropertyRepository,
  UsersRepository,
  AccessService,
  ModuleTypes,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  TemplateExcelEmpAsset,
  TemplateExcelEmpAssetTeams,
} from 'src/utils/generate-excel';

@Injectable()
export class ReportEmpAssetService {
  constructor(
    private readonly employeePropertyRepo: employeePropertyRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}
  async exportAll(query: { type: string; name: string; userId: string }) {
    const { type, name, userId } = query || {};
    let filters = {};

    if (type) {
      filters = { ...filters, type: { equals: type } };
    }
    if (name) {
      filters = { ...filters, name: { contains: name, mode: 'insensitive' } };
    }
    if (userId) {
      filters = { ...filters, userId: { equals: userId } };
    }
    const dataSources = await this.employeePropertyRepo.findMany({
      where: {
        ...filters,
      },
      include: {
        users: {
          select: {
            id: true,
            userId: true,
            firstNameTh: true,
            lastNameTh: true,
            username: true,
            email: true,
            department: true,
            masterPosition: true,
          },
        },
      },
      orderBy: [{ userId: 'asc' }, { createdAt: 'asc' }],
    });
    const transfer = dataSources.map(
      (data: Prisma.employeePropertyWhereInput, index: number) => ({
        No: index + 1,
        ชื่อ: data.users.firstNameTh + ' ' + data.users.lastNameTh,
        แผนก: data.users.masterPosition.nameTh,
        ประเภททรัพย์สิน: this.getAssetTypeLabel(data.type as string),
        common: data.common ? 'ใช่' : 'ไม่ใช่',
        ชื่อทรัพย์สิน: data.name,
        ประเภททรัพย์สินอื่นๆ: data.nameOther,
        ยี่ห้อ: data.brand,
        Serial: data.serial,
        'Asset No.': data.assetNumber,
        สถานะ: data.assetStatus,
        ที่ตั้ง: data.address,
        รายละเอียดอุปกรณ์: data.spec,
      }),
    );
    return await TemplateExcelEmpAssetTeams(transfer, 'report');
  }
  async export(userId: string, query: { type: string; name: string }) {
    const { type, name } = query || {};
    let filters = {};
    if (type) {
      filters = { ...filters, type: { equals: type } };
    }
    if (name) {
      filters = { ...filters, name: { contains: name, mode: 'insensitive' } };
    }
    const dataSources = await this.employeePropertyRepo.findMany({
      where: { userId: userId, ...filters },
    });
    const transfer = dataSources.map(
      (data: Prisma.employeePropertyWhereInput, index: number) => ({
        No: index + 1,
        ประเภททรัพย์สิน: this.getAssetTypeLabel(data.type as string),
        common: data.common ? 'ใช่' : 'ไม่ใช่',
        ชื่อทรัพย์สิน: data.name,
        ประเภททรัพย์สินอื่นๆ: data.nameOther,
        ยี่ห้อ: data.brand,
        Serial: data.serial,
        'Asset No.': data.assetNumber,
        สถานะ: data.assetStatus,
        ที่ตั้ง: data.address,
        รายละเอียดอุปกรณ์: data.spec,
      }),
    );
    return await TemplateExcelEmpAsset(transfer, 'report');
  }
  async exportTeams(
    userIdUser: string,
    query: { type: string; name: string; userId: string },
  ) {
    const { type, name, userId } = query || {};
    let filters = {};

    const getUser = await this.usersRepo.findOne({
      where: { userId: userIdUser },
    });
    const AccessedGroup = await this.accessService.getAccessedGroupByGroupId(
      ModuleTypes.INTRANET,
      getUser.ownerGroupId,
    );
    const getUsers = await this.usersRepo.findMany({
      where: {
        ownerGroupId: { in: AccessedGroup.map((item) => item.groupId) },
      },
    });
    if (type) {
      filters = { ...filters, type: { equals: type } };
    }
    if (name) {
      filters = { ...filters, name: { contains: name, mode: 'insensitive' } };
    }
    if (userId) {
      filters = { ...filters, userId: { equals: userId } };
    } else {
      filters = {
        ...filters,
        userId: { in: getUsers.map((item) => item.userId) },
      };
    }
    const dataSources = await this.employeePropertyRepo.findMany({
      where: {
        ...filters,
      },
      include: {
        users: {
          select: {
            id: true,
            userId: true,
            firstNameTh: true,
            lastNameTh: true,
            username: true,
            email: true,
            department: true,
            masterPosition: true,
          },
        },
      },
      orderBy: [{ userId: 'asc' }, { createdAt: 'asc' }],
    });
    const transfer = dataSources.map(
      (data: Prisma.employeePropertyWhereInput, index: number) => ({
        No: index + 1,
        ชื่อ: data.users.firstNameTh + ' ' + data.users.lastNameTh,
        แผนก: data.users.masterPosition.nameTh,
        ประเภททรัพย์สิน: this.getAssetTypeLabel(data.type as string),
        common: data.common ? 'ใช่' : 'ไม่ใช่',
        ชื่อทรัพย์สิน: data.name,
        ประเภททรัพย์สินอื่นๆ: data.nameOther,
        ยี่ห้อ: data.brand,
        Serial: data.serial,
        'Asset No.': data.assetNumber,
        สถานะ: data.assetStatus,
        ที่ตั้ง: data.address,
        รายละเอียดอุปกรณ์: data.spec,
      }),
    );
    return await TemplateExcelEmpAssetTeams(transfer, 'report');
  }

  startOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(0, 0, 0, 0);
    return new Date(dateset);
  }

  endOfDate(date: string) {
    const dateset = new Date(date).setUTCHours(23, 59, 59, 59);
    return new Date(dateset);
  }

  getAssetTypeLabel(type?: string) {
    switch (type) {
      case 'computer_equipment':
        return 'อุปกรณ์คอมพิวเตอร์';
      case 'office_equipment':
        return 'อุปกรณ์สำนักงาน';
      case 'other_asset':
        return 'อื่นๆ';
      default:
        return type ?? '';
    }
  }
}
