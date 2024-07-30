import { Injectable } from '@nestjs/common';
import { CreateMaCarTypeDto } from './dto/create-ma-car-type.dto';
import { UpdateMaCarTypeDto } from './dto/update-ma-car-type.dto';
import { AccessService, MaCarTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarTypeService {
  constructor(
    // private readonly macarRepo: MaCarRepository,
    private readonly maCarTypeRepository: MaCarTypeRepository, // private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.maCarTypeCreateInput) {
    const condition = { data: data } as Prisma.maCarTypeCreateArgs;
    return this.maCarTypeRepository.create(condition);
  }

  findAll() {
    return this.maCarTypeRepository.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} maCarType`;
  }

  async update(id: number, data: Prisma.maCarTypeUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.maCarTypeUpdateArgs;
    return await this.maCarTypeRepository.update(condition);
  }

  async remove(id: number) {
    const condition = {
      where: { id: id },
    } as Prisma.maCarTypeDeleteArgs;
    return await this.maCarTypeRepository.delete(condition);
  }
}
