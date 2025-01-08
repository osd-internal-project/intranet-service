import { Injectable, Logger } from '@nestjs/common';
import { UserHeaderTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserHeaderTypeService {
  constructor(private userHeaderTypeRepo: UserHeaderTypeRepository) {}

  create(data: Prisma.userGroupMapCreateInput) {
    const condition = { data: data } as Prisma.userHeaderTypeCreateArgs;
    Logger.debug('data:', data);
    return this.userHeaderTypeRepo.create(condition);
  }

  findAll() {
    return this.userHeaderTypeRepo.findMany({});
  }

  findMany(condition: Prisma.userHeaderTypeFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    };
    return this.userHeaderTypeRepo.findMany(condition);
  }
  findFirst(id: number) {
    return this.userHeaderTypeRepo.findFirst({ where: { id } });
  }
  update(id: number, data: Prisma.userHeaderTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userHeaderTypeUpdateArgs;
    return this.userHeaderTypeRepo.update(condition);
  }
  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userHeaderTypeDeleteArgs;
    return await this.userHeaderTypeRepo.delete(condition);
  }
}
