import { Injectable } from '@nestjs/common';
import { CreateMaTypeDto } from './dto/create-ma-type.dto';
import { UpdateMaTypeDto } from './dto/update-ma-type.dto';
import { MaTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';
@Injectable()
export class MaTypeService {
  constructor(private readonly maTypeRepo: MaTypeRepository) {}
  create(data: Prisma.maTypeCreateInput) {
    const condition = {
      data: data,
    } as Prisma.maTypeCreateArgs;
    return this.maTypeRepo.create(condition);
  }

  findAll() {
    return this.maTypeRepo.findAll();
  }

  findOne(condition: Prisma.maTypeFindFirstArgs) {
    return this.maTypeRepo.findOne(condition);
  }

  findActive() {
    return this.maTypeRepo.findMany({
      where: { activeStatus: true },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
  findMany(condition: Prisma.maTypeFindManyArgs) {
    return this.maTypeRepo.findMany({
      ...condition,
      orderBy: [{ createdAt: 'asc' }],
    });
  }

  update(id: number, data: Prisma.maTypeUpdateInput) {
    return this.maTypeRepo.update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: number) {
    return this.maTypeRepo.delete({ where: { id: id } });
  }
}
