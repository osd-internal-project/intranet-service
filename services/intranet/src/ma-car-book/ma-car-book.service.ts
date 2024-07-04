import { Injectable } from '@nestjs/common';
import { CreateMaCarBookDto } from './dto/create-ma-car-book.dto';
import { UpdateMaCarBookDto } from './dto/update-ma-car-book.dto';

@Injectable()
export class MaCarBookService {
  create(createMaCarBookDto: CreateMaCarBookDto) {
    return 'This action adds a new maCarBook';
  }

  findAll() {
    return `This action returns all maCarBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maCarBook`;
  }

  update(id: number, updateMaCarBookDto: UpdateMaCarBookDto) {
    return `This action updates a #${id} maCarBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} maCarBook`;
  }
}
