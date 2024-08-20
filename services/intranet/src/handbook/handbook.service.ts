import { Injectable } from '@nestjs/common';
import { handbookRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbookService {
  constructor(private readonly handbookRepo: handbookRepository) {}

  create(data: Prisma.handbookCreateArgs) {
    return this.handbookRepo.create(data);
  }

  findAll(condition: Prisma.handbookFindManyArgs) {
    return this.handbookRepo.findMany({
      ...condition,
      orderBy: {
        idbook: 'asc',
      },
    });
  }

  findOne(idbook: number) {
    const base = {
      where: {
        idbook: idbook,
      },
    };

    return this.handbookRepo.findOne(base);
  }

  update(idbook: number, condition: Prisma.handbookUpdateArgs) {
    const base = {
      where: {
        idbook: idbook,
      },
      data: { ...condition },
      
      
    } as Prisma.handbookUpdateArgs;
    return this.handbookRepo.update(base);
  }

  remove(idbook: number) {
    return this.handbookRepo.delete({
      where: {
        idbook: idbook,
      },
    });
  }
}