import { Injectable } from '@nestjs/common';
import { newsTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class newsTypeService {
  constructor(private readonly newsTypeRepo: newsTypeRepository) {}

  create(data: Prisma.newsTypeCreateArgs) {
    return this.newsTypeRepo.create(data);
  }

  findAll(condition: Prisma.newsTypeFindManyArgs) {
    return this.newsTypeRepo.findMany({
      ...condition,
      orderBy: {
        idType: 'asc',
      },
    });
  }

  findOne(idType: number) {
    const base = {
      where: {
        idType: idType,
      },
    };

    return this.newsTypeRepo.findOne(base);
  }

  update(carWrapupId: string, condition: Prisma.newsTypeUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
      
      
    } as Prisma.newsTypeUpdateArgs;
    return this.newsTypeRepo.update(base);
  }

  remove(idType: number) {
    return this.newsTypeRepo.delete({
      where: {
        idType: idType,
      },
    });
  }
}
