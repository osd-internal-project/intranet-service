import { Injectable } from '@nestjs/common';
import { CreateMaCarTypeDto } from './dto/create-ma-car-type.dto';
import { UpdateMaCarTypeDto } from './dto/update-ma-car-type.dto';

@Injectable()
export class MaCarTypeService {
  create(createMaCarTypeDto: CreateMaCarTypeDto) {
    return 'This action adds a new maCarType';
  }

  findAll() {
    return `This action returns all maCarType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maCarType`;
  }

  update(id: number, updateMaCarTypeDto: UpdateMaCarTypeDto) {
    return `This action updates a #${id} maCarType`;
  }

  remove(id: number) {
    return `This action removes a #${id} maCarType`;
  }
}
