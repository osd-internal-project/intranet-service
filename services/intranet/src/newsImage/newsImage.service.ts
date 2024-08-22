import { Injectable } from '@nestjs/common';
import { newsImageRepository, PrismaService } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';

@Injectable()
export class NewsImageService {
  findMany(arg0: {
    where: { newsId: number };
    orderBy: { createdAt: string };
  }) {
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

  findOne(imageId: number) {
    const base = {
      where: {
        imageId: imageId,
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

  async remove(imageId: number) {
    const condition = {
      where: {
        imageId: imageId,
      },
    };
    const images = await this.newsImageNewsRepo.findMany(condition);
    images.map((image) => {
      this.deleteFile(image.fileimagePath);
    });
    return await this.newsImageNewsRepo.delete(condition);
  }
  async deleteFile(fileimagePath: string) {
    const filePath = `${fileimagePath}`;
    try {
      await fsPromises.unlink(filePath);
      console.log(`File ${fileimagePath} has been deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${fileimagePath}: ${err.message}`);
    }
  }
}
