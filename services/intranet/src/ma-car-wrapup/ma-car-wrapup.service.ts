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

  findAll(condotion: Prisma.maCarWrapupFindManyArgs) {
    return this.macarwrapupRepo.findMany(condotion);
  }

  findOne(carWrapupId: string) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
    };
    return this.macarwrapupRepo.findOne(base);
  }

  update(carWrapupId: string) {
    return this.macarwrapupRepo.findMany({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }

  remove(carWrapupId: string) {
    return this.macarwrapupRepo.delete({
      where: {
        carWrapupId: carWrapupId,
      },
    });
  }
}
