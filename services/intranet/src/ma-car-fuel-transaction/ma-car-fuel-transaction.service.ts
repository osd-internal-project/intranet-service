import { Injectable, Logger } from '@nestjs/common';
import {
  MaCarFuelTransactionRepository,
  MaCarRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarFuelTransactionService {
  constructor(
    private readonly maCarFuelTransactionRepository: MaCarFuelTransactionRepository,
    private readonly maCarRepository: MaCarRepository,
  ) {}

  create(data: Prisma.maCarFuelTransactionCreateInput) {
    console.log('Create Data:', data);
    const condition = { data: data } as Prisma.maCarFuelTransactionCreateArgs;
    return this.maCarFuelTransactionRepository.create(condition);
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
