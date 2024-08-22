import { Injectable } from '@nestjs/common';
import { handbooktypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbooktypeService {
  constructor(private readonly handbooktypeRepo: handbooktypeRepository) {}

  create(data: Prisma.handbooktypeCreateArgs) {
    return this.handbooktypeRepo.create(data);
  }

  findAll(condition: Prisma.handbooktypeFindManyArgs) {
    return this.handbooktypeRepo.findMany({
      ...condition,
      orderBy: {
        idhandtype: 'asc',
      },
    });
  }

  findOne(idhandtype: number) {
    const base = {
      where: {
        idhandtype: idhandtype,
      },
    };

    return this.handbooktypeRepo.findOne(base);
  }

  update(idhandtype: number, condition: Prisma.handbooktypeUpdateArgs) {
    const base = {
      where: {
        idhandtype: idhandtype,
      },
      data: { ...condition },
      
      
    } as Prisma.handbooktypeUpdateArgs;
    return this.handbooktypeRepo.update(base);
  }

  remove(idhandtype: number) {
    return this.handbooktypeRepo.delete({
      where: {
        idhandtype: idhandtype,
      },
    });
  }
}
