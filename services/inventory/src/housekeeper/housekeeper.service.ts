import { Injectable } from '@nestjs/common';
import { CreateHousekeeperDto } from './dto/create-housekeeper.dto';
import { UpdateHousekeeperDto } from './dto/update-housekeeper.dto';

@Injectable()
export class HousekeeperService {
  create(createHousekeeperDto: CreateHousekeeperDto) {
    return 'This action adds a new housekeeper';
  }

  findAll() {
    return `This action returns all housekeeper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} housekeeper`;
  }

  update(id: number, updateHousekeeperDto: UpdateHousekeeperDto) {
    return `This action updates a #${id} housekeeper`;
  }

  remove(id: number) {
    return `This action removes a #${id} housekeeper`;
  }
}
