import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SlideImageRepository } from '@inventory/share';

@Injectable()
export class SlideImageService {
  constructor(private readonly slideImageRepository: SlideImageRepository) {}

  findAll() {
    return this.slideImageRepository.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  findorder() {
    return this.slideImageRepository.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  create(data: Prisma.slideImageCreateInput) {
    const condition = { data: data } as Prisma.slideImageCreateArgs;
    return this.slideImageRepository.create(condition);
  }

  createfiles(condition: Prisma.dataLeaveFilesCreateInput) {
    return this.slideImageRepository.create({ data: condition });
  }

  async update(fileId: string, data: Prisma.slideImageUpdateInput) {
    const condition = {
      where: { fileId: fileId },
      data: data,
    } as Prisma.slideImageUpdateArgs;
    return this.slideImageRepository.update(condition);
  }

  async updateTebleSlide(fileId: string, data: Prisma.slideImageUpdateInput) {
    const condition = {
      where: { fileId: fileId },
      data: {
        order: data.order,
      },
    } as Prisma.slideImageUpdateArgs;
    return this.slideImageRepository.update(condition);
  }

  remove(id: number) {
    const condition = { where: { id: id } } as Prisma.slideImageDeleteArgs;
    return this.slideImageRepository.delete(condition);
  }

  findImage(fileId: string) {
    const condition = { where: { fileId: fileId } } as Prisma.slideImageArgs;
    return this.slideImageRepository.findOne(condition);
  }

  findImages(id: number) {
    const condition = { where: { id: id } } as Prisma.slideImageArgs;
    return this.slideImageRepository.findOne(condition);
  }

  async updates(fileId: string, data: Prisma.usersUpdateInput) {
    const condition = {
      where: { fileId: fileId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    } as Prisma.usersUpdateArgs;
    return await this.slideImageRepository.update(condition);
  }

  async uploadImags(fileId: string, files: Express.Multer.File) {
    return this.slideImageRepository.create({
      // where: {
      //   fileId: fileId,
      // },
      data: {
        fileId: fileId,
      },
    });
  }

  findImageAll() {
    return this.slideImageRepository.findAll();
  }
}
