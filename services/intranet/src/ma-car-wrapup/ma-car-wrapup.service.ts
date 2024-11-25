import { Injectable } from '@nestjs/common';
import { MaCarWrapupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarWrapupService {
  constructor(private readonly macarwrapupRepo: MaCarWrapupRepository) {}
  async create(data: Prisma.maCarWrapupCreateInput) {
    const maCarWrapup = await this.macarwrapupRepo.create({ data: data });

    return maCarWrapup;
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
    const findone = {
      where: {
        carWrapupId: carWrapupId,
      },
      include: { maCarWrapupImage: true },
    };
    return await this.macarwrapupRepo.findOne(findone);
  }

  async update(carWrapupId: string, condition: Prisma.maCarWrapupUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
    } as Prisma.maCarWrapupUpdateArgs;
    console.log(base);

    const updatemacar = await this.macarwrapupRepo.update(base);
    console.log(`หลังจาก${updatemacar.id}`);

    return updatemacar;
  }

  remove(carWrapupId: string) {
    return this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }
}
