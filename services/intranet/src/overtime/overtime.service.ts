import { Injectable } from '@nestjs/common';
import { DepartMentRepository, OverTimeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class OverTimeService {
  constructor(private readonly overtimeRepo: OverTimeRepository) {}
  create(createDepartmentDto: Prisma.overtimeCreateInput) {
    return this.overtimeRepo.create({ data: createDepartmentDto });
  }

  async findAll() {
    return await this.overtimeRepo.findMany({ orderBy: { id: 'asc' } });
  }

  async findMany(
    condition: Prisma.overtimeFindManyArgs,
    take: number,
    skip: number,
  ) {
    condition = {
      ...condition,
      take: take,
      skip: skip,
    };
    return await this.overtimeRepo.findMany(condition);
  }

  async findOne(id: string) {
    return await this.overtimeRepo.findFirst({ where: { overTimeID: id } });
  }

  async update(id: string, condition: Prisma.overtimeUpdateInput) {
    return await this.overtimeRepo.update({
      where: { overTimeID: id },
      data: condition,
    });
  }

  async remove(id: number) {
    return await `This action removes a #${id} department`;
  }
}
