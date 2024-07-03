import { Injectable } from '@nestjs/common';
import { CreateMaCarDto } from './dto/create-ma-car.dto';
import { UpdateMaCarDto } from './dto/update-ma-car.dto';
import { MaCarRepository } from '@inventory/share';

@Injectable()
export class MaCarService {
  constructor(private readonly macarRepo: MaCarRepository) {}

  create(createMaCarDto: CreateMaCarDto) {
    return 'This action adds a new maCar';
  }

  findAll() {
    return this.macarRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} maCar`;
  }

  update(id: number, updateMaCarDto: UpdateMaCarDto) {
    return `This action updates a #${id} maCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} maCar`;
  }
}
