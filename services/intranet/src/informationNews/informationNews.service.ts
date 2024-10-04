import { Injectable } from '@nestjs/common';
import { InformationRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class informationNewsService {
  constructor(private readonly informationNewsRepo: InformationRepository) {}

  create(data: Prisma.informationNewsCreateArgs) {
    return this.informationNewsRepo.create(data);
  }

  async findAll(condition: Prisma.informationNewsFindManyArgs) {
    return await this.informationNewsRepo.findMany({
      ...condition,
      include: { newsImage: true },
      orderBy: {
        newsId: 'asc',
      },
    });
  }

  async findNewsAll(condition: Prisma.informationNewsFindManyArgs) {
    return await this.informationNewsRepo.findMany({
      ...condition,
      include: { newsImage: true },
      orderBy: {
        newsId: 'desc',
      },
    });
  }

  async findOne(newsId: number) {
    const base = {};

    return await this.informationNewsRepo.findOne({
      where: {
        newsId: newsId,
      },
      include: { newsImage: true },
    });
  }

  update(newsId: number, condition: Prisma.informationNewsUpdateArgs) {
    const base = {
      where: {
        newsId: newsId,
      },
      data: condition,
    } as Prisma.informationNewsUpdateArgs;
    return this.informationNewsRepo.update(base);
  }

  async remove(newsId: number) {
    return await this.informationNewsRepo.delete({
      where: {
        newsId: newsId,
      },
    });
  }
}
