import { Injectable, Logger } from '@nestjs/common';
import { MasterProductFilesRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductFilesService {
  constructor(private masterProductFilesRepo: MasterProductFilesRepository) {}

  async create(id: number, body: any) {
    const data = body.map(
      (element: { filename: any; path: any; originalname: any }) => ({
        idfile: element.filename,
        path: element.path,
        namefile: decodeURIComponent(escape(element.originalname)),
        updatedAt: new Date(),
        productId: id,
      }),
    );
    return await this.masterProductFilesRepo.createMany({ data: data });
  }

  findById(id: number) {
    return this.masterProductFilesRepo.findOne({ where: { id: id } });
  }
}
