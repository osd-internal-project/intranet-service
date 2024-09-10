import { Injectable } from '@nestjs/common';
import { MaCarWrapupImageRepository, PrismaService } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';

@Injectable()
export class maCarWrapupImageService {
  findMany(arg0: {
    where: { idwarpupImage: number };
    orderBy: { createdAt: string };
  }) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly maCarWrapupImageNewsRepo: MaCarWrapupImageRepository) {}

  create(data: Prisma.maCarWrapupImageCreateArgs) {
    return this.maCarWrapupImageNewsRepo.create(data);
  }

  findAll(condition: Prisma.maCarWrapupImageFindManyArgs) {
    return this.maCarWrapupImageNewsRepo.findMany({
      ...condition,
      orderBy: {
        idwarpupImage: 'asc',
      },
    });
  }

  findOne(idwarpupImage: number) {
    const base = {
      where: {
        idwarpupImage: idwarpupImage,
      },
    };

    return this.maCarWrapupImageNewsRepo.findOne(base);
  }

  update(carWrapupId: string, condition: Prisma.maCarWrapupImageUpdateArgs) {
    const base = {
      where: {
        carWrapupId: carWrapupId,
      },
      data: { ...condition },
    } as Prisma.maCarWrapupImageUpdateArgs;
    return this.maCarWrapupImageNewsRepo.update(base);
  }

  async remove(idwarpupImage: number) {
    const condition = {
      where: {
        idwarpupImage: idwarpupImage,
      },
    };
    const images = await this.maCarWrapupImageNewsRepo.findMany(condition);
    images.map((image) => {
      this.deleteFile(image.mafilePart);
    });
    return await this.maCarWrapupImageNewsRepo.delete(condition);
  }
  async deleteFile(mafilePart: string) {
    const filePath = `${mafilePart}`;
    try {
      await fsPromises.unlink(filePath);
      console.log(`File ${mafilePart} has been deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${mafilePart}: ${err.message}`);
    }
  }
}
