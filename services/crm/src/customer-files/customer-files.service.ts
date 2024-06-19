import { Injectable } from '@nestjs/common';
import { CustomerFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerFilesService {
  constructor(private readonly customerFilesRepo: CustomerFilesRepository) {}
  create(data: Prisma.customerFilesCreateInput) {
    return this.customerFilesRepo.create({ data: data });
  }

  findAll() {
    return this.customerFilesRepo.findAll({});
  }

  findOne(condition: Prisma.customerFilesFindFirstArgs) {
    return this.customerFilesRepo.findOne(condition);
  }
  findMany(condition: Prisma.customerFilesFindManyArgs) {
    return this.customerFilesRepo.findAll(condition);
  }
}
