import { Injectable } from '@nestjs/common';
import { handbookRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbookService {
  constructor(private readonly handbookRepo: handbookRepository) {}

  create(data: Prisma.handbookCreateArgs) {
    return this.handbookRepo.create(data);
  }

  async findAll(condition: Prisma.handbookFindManyArgs) {
    return await this.handbookRepo.findMany({
      ...condition,
      orderBy: {
        idbook: 'asc',
      },
      include: { handbookFile: true },
    });
  }

  async findOne(idbook: number) {
    return await this.handbookRepo.findOne({
      where: {
        idbook: idbook,
      },
      include: { handbookFile: true },
    });
    
    // return this.handbookRepo.findOne(base);
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

  async remove(idbook: number) {
    return await this.handbookRepo.delete({
      where: {
        idbook: idbook,
      },
    });
  }
}
