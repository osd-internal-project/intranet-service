import { Injectable, Logger } from '@nestjs/common';
import { UserPermissionTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPermissionTypeService {
  constructor(private userPermissionTypeRepo: UserPermissionTypeRepository) {}

  create(data: Prisma.userGroupMapCreateInput) {
    const condition = { data: data } as Prisma.userPermissionTypeCreateArgs;
    Logger.debug('data:', data);
    return this.userPermissionTypeRepo.create(condition);
  }

  findAll() {
    return this.userPermissionTypeRepo.findMany({});
  }

  findMany(condition: Prisma.userPermissionTypeFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userPermissionTypeRepo.findMany(condition);
  }
  findFirst(id: number) {
    return this.userPermissionTypeRepo.findFirst({ where: { id } });
  }
  update(id: number, data: Prisma.userPermissionTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userPermissionTypeUpdateArgs;
    return this.userPermissionTypeRepo.update(condition);
  }
  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userPermissionTypeDeleteArgs;
    return await this.userPermissionTypeRepo.delete(condition);
  }
}
