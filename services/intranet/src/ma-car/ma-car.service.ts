import { Injectable } from '@nestjs/common';
import { CreateMaCarDto } from './dto/create-ma-car.dto';
import { UpdateMaCarDto } from './dto/update-ma-car.dto';
import { MaCarRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarService {
  constructor(
      private readonly macarRepo: MaCarRepository,
      private readonly macarRepository: MaCarRepository,
  ) {}

  create( data: Prisma.maCarCreateInput) {
    const condition = { data: data } as Prisma.maCarCreateArgs;
    return this.macarRepository.create(condition);
  }

  findAll() {
    return this.macarRepo.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} maCar`;
  }

  update(carId: string, data: Prisma.maCarUpdateInput) {
    const condition = {
      where: { id: carId },
      data: data,
    } as Prisma.maCarUpdateArgs;
    return this.macarRepository.update(condition);
  }

  remove(carId: string) {
    const condition = {
      where: { carId: carId },
    } as Prisma.maCarDeleteArgs;
    return this.macarRepository.delete(condition);
  }
}
