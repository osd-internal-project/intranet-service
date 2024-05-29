import { Injectable } from '@nestjs/common';
import { ImageLocationRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class ImageLocationService {
  constructor(private imagelocationRepo: ImageLocationRepository) {}

  async create(id: number, body: any) {
    return body.forEach(async (element) => {
      const data = {
        idfile: element.filename,
        path: element.path,
        namefile: element.originalname,
        updatedAt: new Date(),
        images_location: id,
      } as Prisma.imagesLocationCreateManyInput;
      return await this.imagelocationRepo.createImagesLocation(data);
    });
  }

  findAll() {
    return this.imagelocationRepo.findAll();
  }

  async update(id: number, data: Prisma.imagesLocationUpdateManyArgs) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.imagesLocationUpdateManyArgs;
    const update_location = await this.imagelocationRepo.update(condition);

    return update_location;
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.imagesLocationDeleteManyArgs;
    return await this.imagelocationRepo.deleteMany(condition);
  }
}
