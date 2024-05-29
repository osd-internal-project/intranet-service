import { Injectable } from '@nestjs/common';
import { MasterProductImageRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterProductImageService {
  constructor(private masterProductImageRepo: MasterProductImageRepository) {}

  async create(id: number, body: any) {
    const data = body.map(
      (element: { filename: any; path: any; originalname: any }) => ({
        idfile: element.filename,
        path: element.path,
        namefile: element.originalname,
        updatedAt: new Date(),
        productId: id,
      }),
    );
    return await this.masterProductImageRepo.createMany({ data: data });
  }

  async removeImage(imageMasterProduct: number) {
    const condition = {
      where: {
        productId: imageMasterProduct,
      },
    };
    return await this.masterProductImageRepo.deleteMany(condition);
  }
  
}
