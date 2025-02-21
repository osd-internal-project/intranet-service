import { Injectable } from '@nestjs/common';
import { CashflowSaleRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowSaleService {
  constructor(private cashflowSaleRepo: CashflowSaleRepository) {}

  create(data: Prisma.cashflowSaleCreateInput) {
    const condition = { data: data } as Prisma.cashflowSaleCreateArgs;
    return this.cashflowSaleRepo.create(condition);
  }

  findAll() {
    return this.cashflowSaleRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowSaleFindManyArgs) {
    return this.cashflowSaleRepo.findMany(condition);
  }
  findFirst(id: number, condition: Prisma.cashflowSaleFindManyArgs) {
    return this.cashflowSaleRepo.findFirst({
      where: { id, ...condition },
    });
  }
  async update(id: number, data: Prisma.cashflowSaleUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.cashflowSaleUpdateArgs;
    return await this.cashflowSaleRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.cashflowSaleDeleteArgs;
    return await this.cashflowSaleRepo.delete(condition);
  }
}
