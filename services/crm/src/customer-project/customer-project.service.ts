import { CustomerProjectRepository } from '@inventory/share';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerProjectService {
  constructor(
    private readonly customerProjectRepo: CustomerProjectRepository,
  ) {}
  create(data: Prisma.customerProjectCreateInput) {
    return this.customerProjectRepo.create({ data: data });
  }
  findAll() {
    return this.customerProjectRepo.findAll();
  }
  findMany(condition: Prisma.customerProjectFindManyArgs) {
    return this.customerProjectRepo.findMany(condition);
  }

  findOneById(id: number) {
    return this.customerProjectRepo.findOne({ where: { id: id } });
  }
  findDetailById(id: number) {
    return this.customerProjectRepo.findOne({
      where: { id: id },
    });
  }
  update(id: number, data: Prisma.customerProjectUpdateInput) {
    return this.customerProjectRepo.update({ where: { id: id }, data: data });
  }

  remove(id: number) {
    return this.customerProjectRepo.delete({ where: { id: id } });
  }
}
