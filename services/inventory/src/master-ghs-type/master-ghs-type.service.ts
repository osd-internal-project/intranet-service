import { Injectable, Logger } from '@nestjs/common';
import { ImageGhsRepository, MasterGhsTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
import { promises as fsPromises } from 'fs';
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
      const conditionImage = {
        where: { imagesGhsId: ghsId },
      } as Prisma.imagesGhsDeleteManyArgs;
      const images = await this.ImgGhsRepo.findMany(conditionImage);
      images.map((image) => {
        this.deleteFile(image.path);
      });
      await this.ImgGhsRepo.deleteMany(conditionImage);
    }
    return deleteGSH;
  }
  async removeImage(images_ghs: string) {
    const condition = {
      where: { imagesGhsId: images_ghs },
    };
    const images = await this.ImgGhsRepo.findMany(condition);
    images.map((image) => {
      this.deleteFile(image.path);
    });
    return await this.ImgGhsRepo.deleteMany(condition);
  }

  async deleteFile(path: string) {
    const filePath = `${path}`;
    try {
      await fsPromises.unlink(filePath);
      console.log(`File ${path} has been deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${path}: ${err.message}`);
    }
  }
}
