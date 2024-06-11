import { Injectable } from '@nestjs/common';
import { CreateTpyeDataLeaveMapDto } from './dto/create-tpye-data-leave-map.dto';
import { UpdateTpyeDataLeaveMapDto } from './dto/update-tpye-data-leave-map.dto';

@Injectable()
export class TpyeDataLeaveMapService {
  create(createTpyeDataLeaveMapDto: CreateTpyeDataLeaveMapDto) {
    return 'This action adds a new tpyeDataLeaveMap';
  }

  findAll() {
    return `This action returns all tpyeDataLeaveMap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tpyeDataLeaveMap`;
  }

  update(id: number, updateTpyeDataLeaveMapDto: UpdateTpyeDataLeaveMapDto) {
    return `This action updates a #${id} tpyeDataLeaveMap`;
  }

  remove(id: number) {
    return `This action removes a #${id} tpyeDataLeaveMap`;
  }
}
