import { Injectable } from '@nestjs/common';
import { CreateMasterProductDto } from './dto/create-master-product.dto';
import { UpdateMasterProductDto } from './dto/update-master-product.dto';
import { MasterProductRepository } from '@inventory/share';

@Injectable()
export class MasterProductService {
  constructor(private readonly masterproductRepo: MasterProductRepository) {}

  create(createMasterProductDto: CreateMasterProductDto) {
    return 'This action adds a new masterProduct';
  }

  findAll() {
    return `This action returns all masterProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterProduct`;
  }

  update(id: number, updateMasterProductDto: UpdateMasterProductDto) {
    return `This action updates a #${id} masterProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterProduct`;
  }
}
