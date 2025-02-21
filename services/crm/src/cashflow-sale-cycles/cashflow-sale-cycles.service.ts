import { Injectable } from '@nestjs/common';
import { CashflowSaleCyclesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowSaleCyclesService {
  constructor(private cashflowSaleCyclesRepo: CashflowSaleCyclesRepository) {}

  create(data: Prisma.cashflowSaleCyclesCreateInput) {
    const condition = { data: data } as Prisma.cashflowSaleCyclesCreateArgs;
    return this.cashflowSaleCyclesRepo.create(condition);
  }

  findAll() {
    return this.cashflowSaleCyclesRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowSaleCyclesFindManyArgs) {
    return this.cashflowSaleCyclesRepo.findMany(condition);
  }
  findFirst(id: number, condition: Prisma.cashflowSaleCyclesFindManyArgs) {
    return this.cashflowSaleCyclesRepo.findFirst({
      where: { id, ...condition },
    });
  }
  async update(id: number, data: Prisma.cashflowSaleCyclesUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.cashflowSaleCyclesUpdateArgs;
    return await this.cashflowSaleCyclesRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.cashflowSaleCyclesDeleteArgs;
    return await this.cashflowSaleCyclesRepo.delete(condition);
  }
}
