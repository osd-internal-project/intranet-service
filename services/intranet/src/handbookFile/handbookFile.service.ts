import { Injectable } from '@nestjs/common';
import { handbookFileRepository,  } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbookFileService {
  constructor(private readonly handbookFileRepo: handbookFileRepository) {}

  create(data: Prisma.handbookFileCreateArgs) {
    return this.handbookFileRepo.create(data);
  }

  findAll(condition: Prisma.handbookFileFindManyArgs) {
    return this.handbookFileRepo.findMany({
      ...condition,
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    const base = {
      where: {
        id: id,
      },
    };

    return this.handbookFileRepo.findOne(base);
  }

  update(carWrapupId: string, condition: Prisma.handbookFileUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
      
      
    } as Prisma.handbookFileUpdateArgs;
    return this.handbookFileRepo.update(base);
  }

  remove(id: number) {
    return this.handbookFileRepo.delete({
      where: {
        id: id,
      },
    });
  }
}
