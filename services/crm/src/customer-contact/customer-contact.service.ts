import { Injectable } from '@nestjs/common';
import { CustomerContactRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerContactService {
  constructor(
    private readonly customerContactRepo: CustomerContactRepository,
  ) {}
  create(data: Prisma.customerContactCreateInput) {
    return this.customerContactRepo.create({ data: data });
  }
  findAll() {
    return this.customerContactRepo.findAll();
  }
  findMany(condition: Prisma.customerContactFindManyArgs) {
    return this.customerContactRepo.findMany(condition);
  }

  findOneById(id: number) {
    return this.customerContactRepo.findOne({ where: { id: id } });
  }

  update(id: number, data: Prisma.customerContactUpdateInput) {
    return this.customerContactRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerContactRepo.delete({ where: { id: id } });
  }
}
