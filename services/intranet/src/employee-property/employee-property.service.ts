import { Injectable } from '@nestjs/common';
import {
  employeePropertyRepository,
  ModuleTypes,
  AccessService,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeePropertyService {
  constructor(
    private readonly employeePropertyRepo: employeePropertyRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
  ) {}
  create(createEmployeePropertyDto: any) {
    return this.employeePropertyRepo.createMany({
      data: createEmployeePropertyDto.map((item) => ({
        userId: item.userId,
        type: item.type,
        name: item.name,
        brand: item.brand ?? '',
        serial: item.serial ?? '',
        assetNumber: item.assetNumber ?? '',
        address: item.address ?? '',
        assetStatus: item.assetStatus ?? '',
        pathImage: item.pathImage ?? '',
      })),
    });
  }

  findAll() {
    return this.employeePropertyRepo.findMany({});
  }

  findOne(id: string) {
    return this.employeePropertyRepo.findOne({
      where: { userId: id },
      include: {
        users: true,
      },
    });
  }

  findMany(userId: string, query: { type: string; name: string }) {
    const { type, name } = query || {};
    let filters = {};
    if (type) {
      filters = { ...filters, type: { equals: type } };
    }
    if (name) {
      filters = { ...filters, name: { contains: name, mode: 'insensitive' } };
    }
    return this.employeePropertyRepo.findMany({
      where: { userId: userId, ...filters },
      include: {
        users: {
          select: {
            id: true,
            userId: true,
            firstNameEn: true,
            lastNameEn: true,
            username: true,
            email: true,
            department: true,
          },
        },
        mistakesType: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findManyTeams(
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

    return this.employeePropertyRepo.findMany({
      where: {
        ...filters,
      },
      include: {
        users: {
          select: {
            id: true,
            userId: true,
            firstNameEn: true,
            lastNameEn: true,
            username: true,
            email: true,
            department: true,
          },
        },
      },
      orderBy: [{ userId: 'asc' }, { createdAt: 'asc' }],
    });
  }

  update(
    id: number,
    updateEmployeePropertyDto: Prisma.employeePropertyUpdateInput,
  ) {
    return this.employeePropertyRepo.update({
      where: { id: id },
      data: updateEmployeePropertyDto,
    });
  }

  remove(id: number) {
    return this.employeePropertyRepo.delete({
      where: { id: id },
    });
  }
}
