import { Injectable, Logger } from '@nestjs/common';
import {
  MaCarFuelTransactionRepository,
  MaCarRepository,
  CarActivityLogService,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarFuelTransactionService {
  constructor(
    private readonly maCarFuelTransactionRepository: MaCarFuelTransactionRepository,
    private readonly maCarRepository: MaCarRepository,
    private readonly activityLog: CarActivityLogService,
  ) {}

  async create(data: Prisma.maCarFuelTransactionCreateInput) {
    const condition = { data: data } as Prisma.maCarFuelTransactionCreateArgs;
    const txn = await this.maCarFuelTransactionRepository.create(condition);
    if (txn?.carId) {
      // actionStatus: use | adjust | reset → action fuel.<status>
      const action = `fuel.${txn.actionStatus ?? 'use'}`;
      await this.activityLog.log({
        carId: txn.carId,
        action,
        refId: txn.id,
        detail: {
          amount: txn.amount,
          remaining: txn.remaining,
          description: txn.description,
        },
      });
    }
    return txn;
  }

  findAll() {
    try {
      return this.maCarFuelTransactionRepository.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  findMany(carId: string) {
    return this.maCarFuelTransactionRepository.findOne({
      where: {
        carId: carId,
      },
    });
  }

  update(carId: string, data: Prisma.maCarFuelTransactionUpdateInput) {
    const condition = {
      where: { carId: carId },
      data: data,
    } as Prisma.maCarFuelTransactionUpdateArgs;
    return this.maCarFuelTransactionRepository.update(condition);
  }

  remove(carId: string) {
    const condition = {
      where: { carId: carId },
    } as Prisma.maCarFuelTransactionDeleteArgs;
    return this.maCarFuelTransactionRepository.delete(condition);
  }
}
