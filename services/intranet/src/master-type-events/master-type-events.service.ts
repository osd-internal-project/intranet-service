import { masterTypeEventsRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterTypeEventsService {
  constructor(
    private readonly mastertypeeventsRepo: masterTypeEventsRepository,
  ) {}
  create(createMasterTypeEventDto: Prisma.masterTypeEventsCreateInput) {
    return this.mastertypeeventsRepo.create({ data: createMasterTypeEventDto });
  }

  async findAll(
    condition: Prisma.masterTypeEventsCreateInput,
    take: number,
    skip: number,
  ) {
    const data = await this.mastertypeeventsRepo.findMany({
      where: condition,
      take,
      skip,
      orderBy: { id: 'asc' },
    });
    const count = await this.mastertypeeventsRepo.count({
      where: condition,
    });
    return { data, count };
  }

  findDropDown() {
    return this.mastertypeeventsRepo.findAll();
  }

  findOne(id: number, condition: Prisma.masterTypeEventsCreateInput) {
    return this.mastertypeeventsRepo.findOne({ where: { id } });
  }

  update(
    id: number,
    updateMasterTypeEventDto: Prisma.masterTypeEventsCreateInput,
  ) {
    return this.mastertypeeventsRepo.update({
      where: { id },
      data: { ...updateMasterTypeEventDto },
    });
  }

  remove(id: number) {
    return this.mastertypeeventsRepo.delete({ where: { id } });
  }
}
