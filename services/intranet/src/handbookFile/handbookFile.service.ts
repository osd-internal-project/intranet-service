import { Injectable } from '@nestjs/common';
import { handbookFileRepository,  } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class handbookFileService {
  constructor(private readonly handbookFileRepo: handbookFileRepository) {}

  create(data: Prisma.handbookFileCreateArgs) {
    return this.handbookFileRepo.create(data);
  }

  findAll(condition: Prisma.handbookFileFindManyArgs) {
    return this.handbookFileRepo.findMany({
      ...condition,
      orderBy: {
        handbookid: 'asc',
      },
    });
  }

  findOne(handbookid: number) {
    const base = {
      where: {
        handbookid : handbookid,
      },
    };

    return this.handbookFileRepo.findOne(base);
  }

  update(handbookid: number, condition: Prisma.handbookFileUpdateArgs) {
    const base = {
      where: {
        handbookid: handbookid,
      },
      data: { ...condition },
      
      
    } as Prisma.handbookFileUpdateArgs;
    return this.handbookFileRepo.update(base);
  }

  remove(handbookid: number) {
    return this.handbookFileRepo.delete({
      where: {
        handbookid : handbookid,
      },
    });
  }
}
