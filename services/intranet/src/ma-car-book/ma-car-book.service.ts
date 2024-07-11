import { Injectable } from '@nestjs/common';
import { CreateMaCarBookDto } from './dto/create-ma-car-book.dto';
import { UpdateMaCarBookDto } from './dto/update-ma-car-book.dto';
import { AccessService, MaCarBookRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MaCarBookService {
  constructor(
    // private readonly macarRepo: MaCarRepository,
    private readonly maCarBookRepository: MaCarBookRepository, // private readonly accessService: AccessService,
  ) {}
  create(data: Prisma.maCarBookCreateInput) {
    const condition = { data: data } as Prisma.maCarBookCreateArgs;
    return this.maCarBookRepository.create(condition);
  }

  findAll() {
    return this.maCarBookRepository.findAll();
  }

  findOne(carId: string) {
    return this.maCarBookRepository.findOne({
      where: {
        carId: carId,
      },
    });
  }

  update(carId: string, data: Prisma.maCarBookUpdateInput) {
    const condition = {
      where: { carId: carId },
      data: data,
    } as Prisma.maCarBookUpdateArgs;
    return this.maCarBookRepository.update(condition);
  }

  remove(carId: string) {
    const condition = { where: { carId: carId } } as Prisma.maCarBookDeleteArgs;
    return this.maCarBookRepository.delete(condition);
  }
}
