import { Injectable } from '@nestjs/common';
import { MaCarBookRepository } from '@inventory/share';
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

  findMany(skip: number = 0, take: number = 10) {
    return this.maCarBookRepository.findMany({
      skip: skip,
      take: take,
      orderBy: { id: 'desc' },
    });
  }

  findManyid(id: number) {
    return this.maCarBookRepository.findMany({
      where: {
        id: id,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  createdById(createdById: string) {
    return this.maCarBookRepository.findMany({
      where: {
        createdById: createdById,
      },
      include: {
        maCar: {
          include: {
            maCarWrapup: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  update(id: Number, data: Prisma.maCarBookUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.maCarBookUpdateArgs;
    return this.maCarBookRepository.update(condition);
  }

  // update(id: Number, data: Prisma.maCarBookUpdateInput) {
  //   const condition = {
  //     where: { id: id },
  //     data: data,
  //   } as Prisma.maCarBookUpdateArgs;

  //   return this.maCarBookRepository.update(condition).then(() => {
  //     return this.maCarBookRepository.findMany({
  //       orderBy: [{ updatedAt: 'desc' }],
  //     });
  //   });
  // }

  remove(id: Number) {
    const condition = { where: { id: id } } as Prisma.maCarBookDeleteArgs;
    return this.maCarBookRepository.delete(condition);
  }
}
