import { Injectable, Logger } from '@nestjs/common';
import { UserModuleRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserModuleService {
  constructor(private userModuleRepo: UserModuleRepository) {}

  create(data: Prisma.userModuleCreateInput) {
    const condition = { data: data } as Prisma.userModuleCreateArgs;
    Logger.debug('data:', data);
    return this.userModuleRepo.create(condition);
  }

  findAll() {
    return this.userModuleRepo.findMany({
      where: { status: true },
      orderBy: [
        {
          code: 'asc',
        },
      ],
    });
  }

  findMany(condition: Prisma.userModuleFindManyArgs) {
    condition = {
      ...condition,
      orderBy: [
        {
          code: 'asc',
        },
      ],
    };
    return this.userModuleRepo.findMany(condition);
  }
  findFirst(id: number) {
    return this.userModuleRepo.findFirst({ where: { id } });
  }
  update(id: number, data: Prisma.userModuleUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.userModuleUpdateArgs;
    return this.userModuleRepo.update(condition);
  }
  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.userModuleDeleteArgs;
    return await this.userModuleRepo.delete(condition);
  }
}
