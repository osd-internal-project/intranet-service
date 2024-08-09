import { Injectable } from '@nestjs/common';
import { UpdateTpyeDataLeaveMapDto } from './dto/update-tpye-data-leave-map.dto';
import { Prisma } from '@prisma/client';
import { MasterTypeLeaveMapRepository } from '@inventory/share';

@Injectable()
export class TpyeDataLeaveMapService {
  constructor(
    private readonly masterTypeLeaveMapRepo: MasterTypeLeaveMapRepository,
  ) {}
  async create(condition: Prisma.typeLeaveDisabledMapCreateArgs) {
    return await this.masterTypeLeaveMapRepo.create(condition);
  }

  findAll() {
    return `This action returns all tpyeDataLeaveMap`;
  }

  async findMany(condition: Prisma.typeLeaveDisabledMapFindManyArgs) {
    return await this.masterTypeLeaveMapRepo.findMany(condition);
  }

  findOne(id: number) {
    return `This action returns a #${id} tpyeDataLeaveMap`;
  }

  update(id: number, updateTpyeDataLeaveMapDto: UpdateTpyeDataLeaveMapDto) {
    return `This action updates a #${id} tpyeDataLeaveMap`;
  }

  async remove(id: number) {
    const condition = {
      where: {
        id: id,
      },
    } as Prisma.typeLeaveDisabledMapDeleteManyArgs;
    return await this.masterTypeLeaveMapRepo.delete(condition);
  }
}
