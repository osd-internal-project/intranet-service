import { Injectable } from '@nestjs/common';
import { newsImageRepository,  } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsImageService {
  constructor(private readonly newsImageNewsRepo: newsImageRepository) {}

  create(data: Prisma.newsImageCreateArgs) {
    return this.newsImageNewsRepo.create(data);
  }

  findAll(condition: Prisma.newsImageFindManyArgs) {
    return this.newsImageNewsRepo.findMany({
      ...condition,
      orderBy: {
        imageId: 'asc',
      },
    });
  }

  findOne(imageId: number) {
    const base = {
      where: {
        imageId: imageId,
      },
    };

    return this.newsImageNewsRepo.findOne(base);
  }

  update(imageId: number, condition: Prisma.newsImageUpdateArgs) {
    const base = {
      where: {
        imageId: imageId,
      },
      data: { ...condition },
      
      
    } as Prisma.newsImageUpdateArgs;
    return this.newsImageNewsRepo.update(base);
  }

  remove(imageId: number) {
    return this.newsImageNewsRepo.delete({
      where: {
        imageId: imageId,
      },
    });
  }
}
