import { Injectable } from '@nestjs/common';
import { InformationRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class InformationService {
  constructor(private readonly InformationRepository: InformationRepository) {}

  create(data: Prisma.InformationCreateInput) {
    const condition = { data: data } as Prisma.InformationCreateArgs;
    return this.InformationRepository.create(condition);
  }

  findAll() {
    return this.InformationRepository.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        maCarBook: true,
      },
    });
  }

  findMany(carId: string) {
    return this.InformationRepository.findMany({
      where: {
        carId: carId,
      },
      include: {
        maCarWrapup: true,
        maCarBook: true,
      },
    });
  }

  update(carId: string, data: Prisma.InformationUpdateInput) {
    const condition = {
      where: { carId: carId },
      data: data,
    } as Prisma.InformationUpdateArgs;
    return this.InformationRepository.update(condition);
  }

  remove(carId: string) {
    const condition = { where: { carId: carId } } as Prisma.InformationDeleteArgs;
    return this.InformationRepository.delete(condition);
  }
}
