import { Injectable } from '@nestjs/common';
import { MaCarFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarFilesService {
  constructor(private readonly MaCarFilesRepo: MaCarFilesRepository) { }
  async create(createMaCarFileDto: Prisma.maCarFilesCreateInput) {
    return await this.MaCarFilesRepo.create({
      data: createMaCarFileDto,
    });
  }

  findAll() {
    return this.MaCarFilesRepo.findAll();
  }

  findOne(id: number) {
    return this.MaCarFilesRepo.findOne({ where: { id } });
  }

  async update(id: number, updateMaCarFileDto: Prisma.maCarFilesUpdateInput) {
    return await this.MaCarFilesRepo.update({
      where: { id },
      data: updateMaCarFileDto,
    });
  }

  remove(id: number) {
    return this.MaCarFilesRepo.delete({ where: { id } });
  }
}
