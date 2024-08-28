import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SlideImageRepository } from '@inventory/share';

@Injectable()
export class SlideImageService {
  constructor(private readonly SlideImageRepository: SlideImageRepository) {}

  findAll() {
    return this.SlideImageRepository.findMany({});
  }

  create(data: Prisma.slideImageCreateInput) {
    const condition = { data: data } as Prisma.slideImageCreateArgs;
    return this.SlideImageRepository.create(condition);
  }

  update(fileId: string, data: Prisma.slideImageUpdateInput) {
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

  
}
