import { Injectable, Logger } from '@nestjs/common';
import { ImageGhsRepository, MasterGhsTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterGhsTypeService {
  constructor(
    private MasterGhsTypeRepo: MasterGhsTypeRepository,
    private ImgGhsRepo: ImageGhsRepository,
  ) {}

  create(data: Prisma.masterGhsTypeCreateInput) {
    const condition = { data: data } as Prisma.masterGhsTypeCreateArgs;
    return this.MasterGhsTypeRepo.create(condition);
  }

  async createImages(id: string, body: any) {
    return await Promise.all(
      body.map(async (element) => {
        const data = {
          idfile: element.filename,
          path: element.path,
          namefile: element.originalname,
          updatedAt: new Date(),
        } as Prisma.imagesGhsCreateManyInput;
        return await this.MasterGhsTypeRepo.update({
          where: { ghsId: id },
          data: { imagesGhs: { create: data } },
        });
      }),
    );
  }

  findAll() {
    const condition = {
      include: {
        imagesGhs: true,
      },
    };
    return this.MasterGhsTypeRepo.findAll(condition);
  }

  async findMany(condition: Prisma.masterGhsTypeFindManyArgs) {
    const Condition = {
      ...condition,
      include: {
        imagesGhs: true,
      },
    };

    return await this.MasterGhsTypeRepo.findMany(Condition);
  }

  async update(id: number, data: Prisma.masterGhsTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterGhsTypeUpdateArgs;
    return await this.MasterGhsTypeRepo.update(condition);
  }

  async remove(id: number, ghsId: string) {
    const condition = { where: { id: id } } as Prisma.masterGhsTypeDeleteArgs;
    const deleteGSH = await this.MasterGhsTypeRepo.delete(condition);
    if (deleteGSH) {
      const conditioniamge = {
        where: { imagesGhsId: ghsId },
      } as Prisma.imagesGhsDeleteManyArgs;
      const deleteImage = await this.ImgGhsRepo.deleteMany(conditioniamge);
      return deleteImage;
    }
    return deleteGSH;
  }
  async removeImage(images_ghs: string) {
    const condition = {
      where: { imagesGhsId: images_ghs },
    } as Prisma.imagesGhsDeleteManyArgs;
    return await this.ImgGhsRepo.deleteMany(condition);
  }
}
