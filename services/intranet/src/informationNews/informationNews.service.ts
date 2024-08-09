import { Injectable } from '@nestjs/common';
import { InformationRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class informationNewsService {
  constructor(private readonly informationNewsRepo: InformationRepository) {}

  create(data: Prisma.informationNewsCreateArgs) {
    return this.informationNewsRepo.create(data);
  }

  findAll(condition: Prisma.informationNewsFindManyArgs) {
    return this.informationNewsRepo.findMany({
      ...condition,
      orderBy: {
        newsId: 'asc',
      },
    });
  }

  findOne(newsId: number) {
    const base = {
      where: {
        newsId: newsId,
      },
    };

    return this.informationNewsRepo.findOne(base);
  }

  update(newsId: number, condition: Prisma.informationNewsUpdateArgs) {
    const base = {
      where: {
        newsId: newsId,
      },
      data:condition,
    } as Prisma.informationNewsUpdateArgs;
    return this.informationNewsRepo.update(base);
  }

  remove(newsId: number) {
    return this.informationNewsRepo.delete({
      where: {
        newsId: newsId,
      },
    });
  }
}
