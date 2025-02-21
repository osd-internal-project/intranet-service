import { Injectable } from '@nestjs/common';
import { CashflowExpenseCyclesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowExpenseCyclesService {
  constructor(
    private cashflowExpenseCyclesRepo: CashflowExpenseCyclesRepository,
  ) {}

  create(data: Prisma.cashflowExpenseCyclesCreateInput) {
    const condition = { data: data } as Prisma.cashflowExpenseCyclesCreateArgs;
    return this.cashflowExpenseCyclesRepo.create(condition);
  }

  findAll() {
    return this.cashflowExpenseCyclesRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowExpenseCyclesFindManyArgs) {
    return this.cashflowExpenseCyclesRepo.findMany(condition);
  }
  findFirst(id: number, condition: Prisma.cashflowExpenseCyclesFindManyArgs) {
    return this.cashflowExpenseCyclesRepo.findFirst({
      where: { id, ...condition },
    });
  }
  async update(id: number, data: Prisma.cashflowExpenseCyclesUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.cashflowExpenseCyclesUpdateArgs;
    return await this.cashflowExpenseCyclesRepo.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.cashflowExpenseCyclesDeleteArgs;
    return await this.cashflowExpenseCyclesRepo.delete(condition);
  }
}
