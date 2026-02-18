import { Injectable, NotFoundException } from '@nestjs/common';
import {
  employeePropertyRepository,
  ModuleTypes,
  AccessService,
  UsersRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import appConfig from '../configs';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { v4 as uuidv4 } from 'uuid';
import type { UpdateEmployeePropertyDto } from './dto/update-employee-property.dto';
const config = appConfig();

@Injectable()
export class EmployeePropertyService {
  constructor(
    private readonly employeePropertyRepo: employeePropertyRepository,
    private readonly usersRepo: UsersRepository,
    private readonly accessService: AccessService,
    private readonly minioService: MinioClientService,
  ) {}
  async create(createEmployeePropertyDto: any, attendFiles: any) {
    const results = [];
    for (let i = 0; i < createEmployeePropertyDto.length; i++) {
      const item = createEmployeePropertyDto[i];
      const file = attendFiles[i];
      let objectName = '';
      if (file) {
        const uuidName = uuidv4();
        const ext = getExtensionFromMime(file.mimetype);
        objectName = `${uuidName}.${ext}`;
        await this.minioService.uploadFile(
          file.buffer,
          file.size,
          config.minioBucket,
          objectName,
        );
      }
      results.push({
        userId: item.userId,
        type: item.type,
        name: item.name,
        brand: item.brand ?? '',
        nameOther: item.nameOther ?? '',
        serial: item.serial ?? '',
        assetNumber: item.assetNumber ?? '',
        address: item.address ?? '',
        assetStatus: item.assetStatus ?? '',
        pathImage: objectName,
        common: item.common ?? false,
      });
    }
    return this.employeePropertyRepo.createMany({
      data: results,
    });
  }

  async findAll(query) {
    const { type, name, userId } = query || {};
    let filters = {};
    if (type) {
      filters = { ...filters, type: { equals: type } };
    }
    if (name) {
      filters = { ...filters, name: { contains: name, mode: 'insensitive' } };
    }
    if (userId) {
      filters = {
        ...filters,
        userId,
      };
    }
    const data = await this.employeePropertyRepo.findMany({
      where: { ...filters },
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
        mistakesType: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    const newData = new Map();
    for (const item of data) {
      const url = item.pathImage
        ? await this.minioService.getPresignedUrl(
            config.minioBucket,
            item.pathImage,
          )
        : '';
      newData.set(item.id, {
        ...item,
        imageUrl: url,
      });
    }
    return Array.from(newData.values());
  }

  findOne(id: string) {
    return this.employeePropertyRepo.findOne({
      where: { userId: id },
      include: {
        users: true,
      },
    });
  }

  async findMany(userId: string, query: { type: string; name: string }) {
    const { type, name } = query || {};
    let filters = {};
    if (type) {
      filters = { ...filters, type: { equals: type } };
    }
    if (name) {
      filters = { ...filters, name: { contains: name, mode: 'insensitive' } };
    }
    const data = await this.employeePropertyRepo.findMany({
      where: { userId: userId, ...filters },
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
        mistakesType: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    const newData = new Map();
    for (const item of data) {
      const url = item.pathImage
        ? await this.minioService.getPresignedUrl(
            config.minioBucket,
            item.pathImage,
          )
        : '';
      newData.set(item.id, {
        ...item,
        imageUrl: url,
      });
    }
    return Array.from(newData.values());
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

    const data = await this.employeePropertyRepo.findMany({
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
    const newData = new Map();
    for (const item of data) {
      const url = item.pathImage
        ? await this.minioService.getPresignedUrl(
            config.minioBucket,
            item.pathImage,
          )
        : '';
      newData.set(item.id, {
        ...item,
        imageUrl: url,
      });
    }
    return Array.from(newData.values());
  }

  async update(
    id: number,
    updateEmployeePropertyDto: UpdateEmployeePropertyDto,
    file: any,
  ) {
    const oldData = await this.employeePropertyRepo.findOne({
      where: { id },
    });
    if (!oldData) {
      throw new NotFoundException('Data not found');
    }
    let objectNameOld = oldData.pathImage;
    let objectName = '';
    if (file) {
      if (oldData.pathImage) {
        await this.minioService.deleteFile(objectNameOld, config.minioBucket);
      }
      const ext = getExtensionFromMime(file.mimetype);
      const uuidName = uuidv4();
      objectName = `${uuidName}.${ext}`;
      await this.minioService.uploadFile(
        file.buffer,
        file.size,
        config.minioBucket,
        objectName,
      );
    }
    return this.employeePropertyRepo.update({
      where: { id: id },
      data: {
        ...updateEmployeePropertyDto,
        pathImage: file ? objectName : objectNameOld,
        common: updateEmployeePropertyDto.common === 'true' ? true : false,
      },
    });
  }

  async remove(id: number) {
    const data = await this.employeePropertyRepo.findOne({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Data not found');
    }
    if (data.pathImage) {
      await this.minioService.deleteFile(data.pathImage, config.minioBucket);
    }
    return this.employeePropertyRepo.delete({
      where: { id: id },
    });
  }
}

function getExtensionFromMime(mime: string) {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };

  return map[mime] || 'jpg';
}
