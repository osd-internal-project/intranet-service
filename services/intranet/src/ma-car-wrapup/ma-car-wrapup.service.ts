import { Injectable } from '@nestjs/common';
import { MaCarWrapupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarWrapupService {
  constructor(private readonly macarwrapupRepo: MaCarWrapupRepository) {}

  create(data: Prisma.maCarWrapupCreateArgs) {
    return this.macarwrapupRepo.create(data);
  }

  async findAll(condition: Prisma.maCarWrapupFindManyArgs) {
    return await this.macarwrapupRepo.findMany({
      ...condition,
      orderBy: {
        id: 'asc',
      },
      include: { maCarWrapupImage: true },
    });
  }

  async findOne(carWrapupId: string) {
    return await this.macarwrapupRepo.findOne({
      where: {
        carWrapupId: carWrapupId,
      },
      include: { maCarWrapupImage: true },
    });
  }

  update(carWrapupId: string, condition: Prisma.maCarWrapupUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
    } as Prisma.maCarWrapupUpdateArgs;
    return this.macarwrapupRepo.update(base);
  }

  remove(carWrapupId: string) {
    return this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }
}
