import { Injectable, Logger } from '@nestjs/common';
import { MaCarRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarService {
  constructor(private readonly maCarRepository: MaCarRepository) {}

  create(data: Prisma.maCarCreateInput) {
    const condition = { data: data } as Prisma.maCarCreateArgs;
    return this.maCarRepository.create(condition);
  }

  findAll() {
    try {
      return this.maCarRepository.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          maCarBook: true,
          maCarFiles: true,
        },
      });
    } catch (error) {
      Logger.error(error);
      return [];
    }
  }

  findMany(carId: string) {
    return this.maCarRepository.findOne({
      where: {
        carId: carId,
      },
      include: {
        maCarWrapup: true,
        maCarBook: true,
      },
    });
  }

  update(carId: string, data: Prisma.maCarUpdateInput) {
    const condition = {
      where: { carId: carId },
      data: data,
    } as Prisma.maCarUpdateArgs;
    console.log('Update Condition:', data);
    return this.maCarRepository.update(condition);
  }

  remove(carId: string) {
    const condition = { where: { carId: carId } } as Prisma.maCarDeleteArgs;
    return this.maCarRepository.delete(condition);
  }
}
