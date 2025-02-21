import { Injectable } from '@nestjs/common';
import { CashflowExpenseRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowExpenseService {
  constructor(private cashflowExpenseRepo: CashflowExpenseRepository) {}

  create(data: Prisma.cashflowExpenseCreateInput) {
    const condition = { data: data } as Prisma.cashflowExpenseCreateArgs;
    return this.cashflowExpenseRepo.create(condition);
  }

  findAll() {
    return this.cashflowExpenseRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowExpenseFindManyArgs) {
    return this.cashflowExpenseRepo.findMany(condition);
  }
  findFirst(id: number, condition: Prisma.cashflowExpenseFindManyArgs) {
    return this.cashflowExpenseRepo.findFirst({
      where: { id, ...condition },
    });
  }
  async update(id: number, data: Prisma.cashflowExpenseUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.cashflowExpenseUpdateArgs;
    return await this.cashflowExpenseRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.cashflowExpenseDeleteArgs;
    return await this.cashflowExpenseRepo.delete(condition);
  }
}
