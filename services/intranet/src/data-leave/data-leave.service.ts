import {
  DataLeaveRepository,
  dataLeaveFilesRepository,
} from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DataLeaveService {
  constructor(
    private readonly dataleaveRepo: DataLeaveRepository,
    private readonly dataleavefileRepo: dataLeaveFilesRepository,
  ) {}

  async create(condition: Prisma.dataLeaveCreateArgs) {
    return await this.dataleaveRepo.create(condition);
  }
  findAll() {
    return `This action returns all dataLeave`;
  }
  findOne(id: number) {
    return `This action returns a #${id} dataLeave`;
  }
  async findMany(condition: Prisma.dataLeaveFindManyArgs) {
    return await this.dataleaveRepo.findMany(condition);
  }

  async update(condition: Prisma.dataLeaveUpdateArgs) {
    return await this.dataleaveRepo.update(condition);
  }

  remove(id: number) {
    return `This action removes a #${id} dataLeave`;
  }
}
