import { Injectable } from '@nestjs/common';
import { CustomerAddressRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerAddressService {
  constructor(
    private readonly customerAddressRepo: CustomerAddressRepository,
  ) {}
  create(data: Prisma.customerAddressCreateInput) {
    return this.customerAddressRepo.create({ data: data });
  }
  findAll() {
    return this.customerAddressRepo.findAll();
  }
  findMany(condition: Prisma.customerAddressFindManyArgs) {
    return this.customerAddressRepo.findMany(condition);
  }

  findOneById(id: number) {
    return this.customerAddressRepo.findOne({ where: { id: id } });
  }

  update(id: number, data: Prisma.customerAddressUpdateInput) {
    return this.customerAddressRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerAddressRepo.delete({ where: { id: id } });
  }
}
