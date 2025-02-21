import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CashflowSaleCyclesRepository,
  CashflowSaleRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';
import { TCreateCycleForm, TUpdateCycleForm } from './common';

@Injectable()
export class CashflowSaleService {
  constructor(
    private cashflowSaleRepo: CashflowSaleRepository,
    private cashflowSaleCyclesRepo: CashflowSaleCyclesRepository,
  ) {}

  create(data: Prisma.cashflowSaleCreateInput) {
    const condition = { data: data } as Prisma.cashflowSaleCreateArgs;
    return this.cashflowSaleRepo.create(condition);
  }
  async createContract(
    data: Prisma.cashflowSaleCreateInput,
    cycles: TCreateCycleForm[],
  ) {
    try {
      Logger.debug({ data: data, cycles: cycles });
      const condition = { data: data } as Prisma.cashflowSaleCreateArgs;
      const contract = await this.cashflowSaleRepo.create(condition);
      if (contract) {
        const contractCycles = cycles.map((cycle, index) => ({
          ...cycle,
          cashflowSaleId: contract.id,
          netPrice: contract.netPrice,
          cyclesId: `${contract.contractId}-${index + 1}`,
        })) as Prisma.cashflowSaleCyclesCreateManyInput[];
        const createdCycles = await this.cashflowSaleCyclesRepo.createMany({
          data: contractCycles,
        });
        return { constract: contract, cycles: createdCycles };
      }
    } catch (e) {
      Logger.error(e.message);
      return e;
    }
  }
  findAll() {
    return this.cashflowSaleRepo.findMany({});
  }

  findMany(condition: Prisma.cashflowSaleWhereInput) {
    const { customerProjectId } = condition;
    return this.cashflowSaleRepo.findMany({
      where: { customerProjectId: +customerProjectId },
    });
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
  async updateContract(
    id: number,
    data: Prisma.cashflowSaleUpdateInput,
    cycles: TUpdateCycleForm[],
  ) {
    try {
      Logger.debug({ id: id, data: data, cycles: cycles });
      const condition = {
        where: { id: id },
        data: data,
      } as Prisma.cashflowSaleUpdateArgs;
      const contract = await this.cashflowSaleRepo.update(condition);

      if (contract) {
        await this.cashflowSaleCyclesRepo.deleteMany({
          where: { cashflowSaleId: contract.id },
        });
        const contractCycles = cycles.map((cycle, index) => ({
          ...cycle,
          cashflowSaleId: contract.id,
          netPrice: contract.netPrice,
          cyclesId: `${contract.contractId}-${index + 1}`,
        })) as Prisma.cashflowSaleCyclesCreateManyInput[];
        const createdCycles = await this.cashflowSaleCyclesRepo.createMany({
          data: contractCycles,
        });
        return { constract: contract, cycles: createdCycles };
      }
    } catch (e) {
      Logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  async cancelContract(id: number) {
    try {
      Logger.debug({ id: id });
      const condition = {
        where: { id: id },
        data: {
          status: 'cancel',
          cashflowSaleCycles: {
            updateMany: {
              where: { cashflowSaleId: id, status: 'pending' },
              data: { status: 'cancel' },
            },
          },
        },
      } as Prisma.cashflowSaleUpdateArgs;
      return this.cashflowSaleRepo.update(condition);
    } catch (e) {
      Logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }
  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.cashflowSaleDeleteArgs;
    return await this.cashflowSaleRepo.delete(condition);
  }
}
