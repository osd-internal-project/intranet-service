import { Injectable } from '@nestjs/common';
import { CashflowActivityTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowActivityTypeService {
  constructor(
    private cashflowActivityTypeRepo: CashflowActivityTypeRepository,
  ) {}

  create(data: Prisma.cashflowActivityTypeCreateInput) {
    const condition = { data: data } as Prisma.cashflowActivityTypeCreateArgs;
    return this.cashflowActivityTypeRepo.create(condition);
  }

  findAll() {
    return this.cashflowActivityTypeRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowActivityTypeFindManyArgs) {
    return this.cashflowActivityTypeRepo.findMany(condition);
  }
  findFirst(id: number, condition: Prisma.cashflowActivityTypeFindManyArgs) {
    return this.cashflowActivityTypeRepo.findFirst({
      where: { id, ...condition },
    });
  }
  async update(id: number, data: Prisma.cashflowActivityTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.cashflowActivityTypeUpdateArgs;
    return await this.cashflowActivityTypeRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.cashflowActivityTypeDeleteArgs;
    return await this.cashflowActivityTypeRepo.delete(condition);
  }
}
