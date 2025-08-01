import { Injectable } from '@nestjs/common';
import { CreateMasterProductImageDto } from './dto/create-master-product-image.dto';
import { UpdateMasterProductImageDto } from './dto/update-master-product-image.dto';
import { MasterProductImageRepository } from '@inventory/share';

@Injectable()
export class MasterProductImageService {
  constructor(
    private readonly masterproductimageRepo: MasterProductImageRepository,
  ) {}
  async create(createMasterProductImageDto: CreateMasterProductImageDto) {
    const base = { data: createMasterProductImageDto };
    const response = await this.masterproductimageRepo.create(base);
    return response;
  }

  findAll() {
    return `This action returns all masterProductImage`;
  }

  findOne(id: string) {
    return this.masterproductimageRepo.findOne({
      where: {
        prdImageId: id,
      },
    });
  }

  update(id: number, updateMasterProductImageDto: UpdateMasterProductImageDto) {
    return `This action updates a #${id} masterProductImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterProductImage`;
  }
}
