import { Injectable } from '@nestjs/common';
import { MasterProductImageRepository } from '@inventory/share';
import * as fs from 'fs/promises';
@Injectable()
export class MasterProductImageService {
  constructor(
    private readonly masterproductimageRepo: MasterProductImageRepository,
  ) {}
  async create(createDto: any) {
    const { masterProductId } = createDto;
    const existing = await this.masterproductimageRepo.findOne({
      where: { masterProductId },
    });
    if (existing) {
      await this.removeImage(existing.id);
      return this.masterproductimageRepo.update({
        where: { id: existing.id },
        data: createDto,
      });
    } else {
      return this.masterproductimageRepo.create({ data: createDto });
    }
  }

  findOne(id: string) {
    return this.masterproductimageRepo.findOne({
      where: {
        prdImageId: id,
      },
    });
  }

  async remove(id: number) {
    const image = await this.masterproductimageRepo.findOne({ where: { id } });
    if (!image) return;
    try {
      if (image.filePath) {
        await fs.unlink(image.filePath);
        console.log(`Image deleted: ${image.filePath}`);
      }
    } catch (err) {
      console.error(`Failed to delete image:`, err);
    }
    return this.masterproductimageRepo.delete({ where: { id } });
  }

  async removeImage(id: number) {
    const image = await this.masterproductimageRepo.findOne({ where: { id } });
    if (!image) return false;
    try {
      if (image.filePath) {
        console.log(`Image deleted: ${image.filePath}`);
        await fs.unlink(image.filePath);
      }
    } catch (err) {
      console.error(`Failed to delete image:`, err);
    }
    return true;
  }
}
