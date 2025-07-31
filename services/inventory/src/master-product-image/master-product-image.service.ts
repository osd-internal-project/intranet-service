import { Injectable } from '@nestjs/common';
import { CreateMasterProductImageDto } from './dto/create-master-product-image.dto';
import { UpdateMasterProductImageDto } from './dto/update-master-product-image.dto';

@Injectable()
export class MasterProductImageService {
  create(createMasterProductImageDto: CreateMasterProductImageDto) {
    return 'This action adds a new masterProductImage';
  }

  findAll() {
    return `This action returns all masterProductImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterProductImage`;
  }

  update(id: number, updateMasterProductImageDto: UpdateMasterProductImageDto) {
    return `This action updates a #${id} masterProductImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterProductImage`;
  }
}
