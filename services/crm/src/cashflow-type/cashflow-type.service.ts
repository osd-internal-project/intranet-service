import { Injectable } from '@nestjs/common';
import { CashflowTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowTypeService {
  constructor(private cashflowTypeRepo: CashflowTypeRepository) {}

  create(data: Prisma.cashflowTypeCreateInput) {
    const condition = { data: data } as Prisma.cashflowTypeCreateArgs;
    return this.cashflowTypeRepo.create(condition);
  }

  findAll() {
    return this.cashflowTypeRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowTypeFindManyArgs) {
    return this.cashflowTypeRepo.findMany(condition);
  }
  findFirst(id: number, condition: Prisma.cashflowTypeFindManyArgs) {
    return this.cashflowTypeRepo.findFirst({
      where: { id, ...condition },
    });
  }
  async update(id: number, data: Prisma.cashflowTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.cashflowTypeUpdateArgs;
    return await this.cashflowTypeRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.cashflowTypeDeleteArgs;
    return await this.cashflowTypeRepo.delete(condition);
  }
}
