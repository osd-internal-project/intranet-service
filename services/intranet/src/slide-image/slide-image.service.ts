import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SlideImageRepository } from '@inventory/share';

@Injectable()
export class SlideImageService {
  constructor(private readonly SlideImageRepository: SlideImageRepository) {}

  findAll() {
    return this.SlideImageRepository.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  create(data: Prisma.slideImageCreateInput) {
    const condition = { data: data } as Prisma.slideImageCreateArgs;
    return this.SlideImageRepository.create(condition);
  }

  createfiles(condition: Prisma.dataLeaveFilesCreateInput) {
    return this.SlideImageRepository.create({ data: condition });
  }

  async update(fileId: string, data: Prisma.slideImageUpdateInput) {
    const condition = {
      where: { fileId: fileId },
      data: data,
    } as Prisma.slideImageUpdateArgs;
    return this.SlideImageRepository.update(condition);
  }

  remove(id: number) {
    const condition = { where: { id: id } } as Prisma.slideImageDeleteArgs;
    return this.SlideImageRepository.delete(condition);
  }
  findImage(fileId: string) {
    const condition = { where: { fileId: fileId } } as Prisma.slideImageArgs;
    return this.SlideImageRepository.findOne(condition);
  }

  async updates(fileId: string, data: Prisma.usersUpdateInput) {
    const condition = {
      where: { fileId: fileId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    } as Prisma.usersUpdateArgs;
    return await this.SlideImageRepository.update(condition);
  }

  async uploadImags(fileId: string, files: Express.Multer.File) {
    return this.SlideImageRepository.create({
      // where: {
      //   fileId: fileId,
      // },
      data: {
        fileId: fileId,
      },
    });
  }

  findByFileId(id: number) {
    const condition = { where: { id: id } } as Prisma.slideImageArgs;
    return this.SlideImageRepository.findOne(condition);
  }

  findImageAll() {
    return this.SlideImageRepository.findAll();
  }

  async findAlls(id: number[]) {
    return this.SlideImageRepository.findMany({
      where: {
        id: {
          in: id, 
        },
      },
    });
  }
}
