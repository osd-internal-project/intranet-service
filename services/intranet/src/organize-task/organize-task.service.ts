import { Injectable } from '@nestjs/common';
import { organizeTaskRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizeTaskService {
  constructor(private readonly organizetaskRepo: organizeTaskRepository) {}
  create(createOrganizeTaskDto: Prisma.organizeTaskCreateInput) {
    return this.organizetaskRepo.create({
      data: createOrganizeTaskDto,
    });
  }

  findAll() {
    return this.organizetaskRepo.findMany({});
  }

  findMany(condition: Prisma.organizeTaskFindManyArgs) {
    return this.organizetaskRepo.findMany(condition);
  }

  findOne(id: number) {
    return this.organizetaskRepo.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateOrganizeTaskDto: Prisma.organizeTaskUpdateInput) {
    return this.organizetaskRepo.update({
      where: {
        id,
      },
      data: updateOrganizeTaskDto,
    });
  }

  remove(id: number) {
    return this.organizetaskRepo.delete({
      where: {
        id,
      },
    });
  }
}
