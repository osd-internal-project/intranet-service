import { Injectable } from '@nestjs/common';
import { dataLeaveFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class DataLeaveFileService {
  constructor(private readonly dataleavefilesRepo: dataLeaveFilesRepository) {}
  create(condition: Prisma.dataLeaveFilesCreateInput) {
    return this.dataleavefilesRepo.create({ data: condition });
  }

  findAll() {
    return `This action returns all dataLeaveFile`;
  }

  findMany(condition: Prisma.dataLeaveFilesFindManyArgs) {
    return `This action returns all dataLeaveFile`;
  }

  findOne(condition: Prisma.dataLeaveFilesFindFirstArgs) {
    return this.dataleavefilesRepo.findOne(condition);
  }

  update(condition: Prisma.dataLeaveFilesUpdateArgs) {
    return `This action updates a #${condition} dataLeaveFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataLeaveFile`;
  }
}
