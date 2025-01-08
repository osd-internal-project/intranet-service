import { Injectable } from '@nestjs/common';
import { MasterConfigTimeOtRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterConfigOvertimeService {
  constructor(
    private readonly masterconfigtimeotRepo: MasterConfigTimeOtRepository,
  ) {}
  create(createDepartmentDto: Prisma.masterDataConfigTimeOTCreateInput) {
    return this.masterconfigtimeotRepo.create({ data: createDepartmentDto });
  }

  async findAll() {
    return await this.masterconfigtimeotRepo.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findMany(
    condition: Prisma.masterDataConfigTimeOTFindManyArgs,
    take: number,
    skip: number,
  ) {
    condition = {
      ...condition,
      take: take,
      skip: skip,
    };
    return await this.masterconfigtimeotRepo.findMany(condition);
  }

  async findOne(id: number) {
    return await this.masterconfigtimeotRepo.findFirst({
      where: { id: id },
    });
  }

  async update(
    id: number,
    condition: Prisma.masterDataConfigTimeOTUpdateInput,
  ) {
    return await this.masterconfigtimeotRepo.update({
      where: { id: id },
      data: condition,
    });
  }

  async remove(id: number) {
    return await `This action removes a #${id} department`;
  }
}
