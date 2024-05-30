import { Injectable } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { FloorRepository } from '@inventory/share';

@Injectable()
export class FloorService {
  constructor(private floorRepo: FloorRepository) {}
  create(createFloorDto: CreateFloorDto) {
    return this.floorRepo.create({
      data: { floorName: createFloorDto.floorName },
    });
  }

  findAll() {
    return this.floorRepo.findAll();
  }

  findMany() {
    return `This action returns all floor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floor`;
  }

  update(id: number, updateFloorDto: UpdateFloorDto) {
    return `This action updates a #${id} floor`;
  }

  remove(id: number) {
    return `This action removes a #${id} floor`;
  }
}
