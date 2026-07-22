import { Injectable, Logger } from '@nestjs/common';
import {
  MaCarRepository,
  CarActivityLogService,
  CarActivityAction,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarService {
  constructor(
    private readonly maCarRepository: MaCarRepository,
    private readonly activityLog: CarActivityLogService,
  ) {}

  async create(data: Prisma.maCarCreateInput) {
    const condition = { data: data } as Prisma.maCarCreateArgs;
    const car = await this.maCarRepository.create(condition);
    await this.activityLog.log({
      carId: car.carId,
      carName: car.carName,
      action: CarActivityAction.CAR_CREATE,
      refId: car.carId,
      actorId: (data as any).createdById,
      actorName: (data as any).createdByName,
      detail: { carName: car.carName, licensePlate: car.licensePlate },
    });
    return car;
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

  async update(carId: string, data: Prisma.maCarUpdateInput) {
    const condition = {
      where: { carId: carId },
      data: data,
    } as Prisma.maCarUpdateArgs;
    const car = await this.maCarRepository.update(condition);
    await this.activityLog.log({
      carId,
      carName: car.carName,
      action: CarActivityAction.CAR_UPDATE,
      refId: carId,
      actorId: (data as any).updatedById,
      actorName: (data as any).updatedByName,
      detail: data,
    });
    return car;
  }

  async remove(carId: string) {
    const existing = await this.maCarRepository.findOne({ where: { carId } });
    const condition = { where: { carId: carId } } as Prisma.maCarDeleteArgs;
    const res = await this.maCarRepository.delete(condition);
    await this.activityLog.log({
      carId,
      carName: existing?.carName,
      action: CarActivityAction.CAR_DELETE,
      refId: carId,
    });
    return res;
  }
}
