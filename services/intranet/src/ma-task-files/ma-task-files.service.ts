import { Injectable } from '@nestjs/common';
import { MaTaskFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaTaskFilesService {
  constructor(private readonly maTaskFilesRepo: MaTaskFilesRepository) {}
  create(data: Prisma.maTaskFilesCreateInput) {
    return this.maTaskFilesRepo.create({ data: data });
  }

  findAll() {
    return this.maTaskFilesRepo.findAll({});
  }

  findOne(condition: Prisma.maTaskFilesFindFirstArgs) {
    return this.maTaskFilesRepo.findOne(condition);
  }
  findMany(condition: Prisma.maTaskFilesFindManyArgs) {
    return this.maTaskFilesRepo.findAll(condition);
  }
}
