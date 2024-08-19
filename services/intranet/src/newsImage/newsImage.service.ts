import { Injectable } from '@nestjs/common';
import { newsImageRepository,  } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsImageService {
  find(arg0: { where: { newsId: string; }; }) {
    throw new Error('Method not implemented.');
  }
  delete(id: any) {
    throw new Error('Method not implemented.');
  }
  countImages(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly newsImageNewsRepo: newsImageRepository) {}

  create(data: Prisma.newsImageCreateArgs) {
    return this.newsImageNewsRepo.create(data);
  }

  findAll(condition: Prisma.newsImageFindManyArgs) {
    return this.newsImageNewsRepo.findMany({
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

    return this.newsImageNewsRepo.findOne(base);
  }
  

  update(newsId: number, condition: Prisma.newsImageUpdateArgs) {
    const base = {
      where: {
        newsId: newsId,
      },
      data: { ...condition },
      
      
    } as Prisma.newsImageUpdateArgs;
    return this.newsImageNewsRepo.update(base);
  }

  remove(newsId: number) {
    return this.newsImageNewsRepo.delete({
      where: {
        newsId: newsId,
      },
    });
  }
}
