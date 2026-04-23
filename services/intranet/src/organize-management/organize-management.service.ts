import { Injectable } from '@nestjs/common';
import { organizeManagementRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizeManagementService {
  constructor(
    private readonly organizemanagementRepo: organizeManagementRepository,
  ) {}
  create(createOrganizeManagementDto: Prisma.organizeManagementCreateInput) {
    return this.organizemanagementRepo.create({
      data: createOrganizeManagementDto,
    });
  }

  findAll() {
    return this.organizemanagementRepo.findMany({});
  }

  findMany(condition: Prisma.organizeManagementFindManyArgs) {
    return this.organizemanagementRepo.findMany(condition);
  }

  findOne(id: number) {
    return this.organizemanagementRepo.findOne({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    updateOrganizeManagementDto: Prisma.organizeManagementUpdateInput,
  ) {
    return this.organizemanagementRepo.update({
      where: {
        id,
      },
      data: updateOrganizeManagementDto,
    });
  }

  remove(id: number) {
    return this.organizemanagementRepo.delete({
      where: {
        id,
      },
    });
  }
}
