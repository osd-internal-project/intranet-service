import { Injectable } from '@nestjs/common';
import { CreateMasterProvinceThailandDto } from './dto/create-master-province-thailand.dto';
import { UpdateMasterProvinceThailandDto } from './dto/update-master-province-thailand.dto';
import { MasterProvinceRepository } from '@inventory/share';
import type { Prisma } from '@prisma/client';

@Injectable()
export class MasterProvinceThailandService {
  constructor(private readonly masterprovinceRepo: MasterProvinceRepository) {}
  create(
    createMasterProvinceThailandDto: Prisma.masterProvinceThailandCreateInput,
  ) {
    return this.masterprovinceRepo.create({
      data: createMasterProvinceThailandDto,
    });
  }

  findAll() {
    return this.masterprovinceRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} masterProvinceThailand`;
  }

  update(
    id: number,
    updateMasterProvinceThailandDto: UpdateMasterProvinceThailandDto,
  ) {
    return `This action updates a #${id} masterProvinceThailand`;
  }

  remove(id: number) {
    return `This action removes a #${id} masterProvinceThailand`;
  }
}
