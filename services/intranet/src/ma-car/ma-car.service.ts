import { Injectable } from '@nestjs/common';
import { AccessService, MaCarRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarService {
  constructor(
    private readonly macarRepo: MaCarRepository,
    private readonly maCarRepository: MaCarRepository,
    private readonly accessService: AccessService,
  ) {}

  create(data: Prisma.maCarCreateInput) {
    const condition = { data: data } as Prisma.maCarCreateArgs;
    return this.maCarRepository.create(condition);
  }
  // 'This action adds a new maCar'

  findAll() {
    return this.maCarRepository.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        maCarBook: true,
      },
    });
  }

  findMany(carId: string) {
    return this.maCarRepository.findMany({
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
    return this.maCarRepository.update(condition);
  }

  remove(carId: string) {
    const condition = { where: { carId: carId } } as Prisma.maCarDeleteArgs;
    return this.maCarRepository.delete(condition);
  }
}
