import { Injectable } from '@nestjs/common';
import { dataLeaveFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class DataLeaveFileService {
  constructor(private readonly dataleavefilesRepo: dataLeaveFilesRepository) {}
  create(condition: Prisma.dataLeaveFilesCreateArgs) {
    return 'This action adds a new dataLeaveFile';
  }

  findAll() {
    return `This action returns all dataLeaveFile`;
  }

  findMany(condition: Prisma.dataLeaveFilesFindManyArgs) {
    return `This action returns all dataLeaveFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataLeaveFile`;
  }

  update(condition: Prisma.dataLeaveFilesUpdateArgs) {
    return `This action updates a #${condition} dataLeaveFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataLeaveFile`;
  }
}
