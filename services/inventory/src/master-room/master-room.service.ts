import { Injectable } from '@nestjs/common';
import {
  MasterRoomeRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterRoomService {
  constructor(
    private masterRoomeRepository: MasterRoomeRepository,
  ) { }
  create(data: Prisma.masterRoomCreateInput) {
    console.log(data);
    const condition = { data: data } as Prisma.masterRoomCreateArgs;
    return this.masterRoomeRepository.create(condition);
  }

  findAll() {
    return this.masterRoomeRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} masterRoom`;
  }

  async update(id: number, data: Prisma.masterRoomUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.masterRoomUpdateArgs;
    return await this.masterRoomeRepository.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.masterRoomDeleteArgs;
    return await this.masterRoomeRepository.delete(condition);
  }
}
