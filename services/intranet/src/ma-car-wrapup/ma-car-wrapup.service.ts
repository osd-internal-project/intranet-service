import { Injectable } from '@nestjs/common';
import { CreateMaCarWrapupDto } from './dto/create-ma-car-wrapup.dto';
import { UpdateMaCarWrapupDto } from './dto/update-ma-car-wrapup.dto';
import { MaCarWrapupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarWrapupService {
  constructor(private readonly macarwrapupRepo: MaCarWrapupRepository) {}

  create(data: Prisma.maCarWrapupCreateArgs) {
    return this.macarwrapupRepo.create(data);
  }

  findAll(condition: Prisma.maCarWrapupFindManyArgs) {
    return this.macarwrapupRepo.findMany({
      ...condition,
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(carWrapupId: string) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
    };

    return this.macarwrapupRepo.findOne(base);
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
