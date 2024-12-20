import { Injectable } from '@nestjs/common';
import { ContactRepository, VenderTypeRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class VenderTypeService {
  constructor(
    private venderTypeRepo: VenderTypeRepository,
    private contactRepo: ContactRepository,
  ) {}
  create(data: Prisma.venderTypeCreateInput) {
    const condition = { data: data } as Prisma.venderTypeCreateArgs;
    return this.venderTypeRepo.create(condition);
  }

  createContact(data: Prisma.contactCreateManyInput[]) {
    return this.contactRepo.createContact({ data: data });
  }

  findAll() {
    return this.venderTypeRepo.findAll({ orderBy: { id: 'desc' } });
  }
  count() {
    const condition = {} as Prisma.venderTypeCountArgs;

    return this.venderTypeRepo.count(condition);
  }
  findMany(condition: Prisma.venderTypeFindManyArgs) {
    const Condition = {
      ...condition,
      include: {
        contact: true,
      },
      orderBy: { id: 'asc' },
    } as Prisma.venderTypeFindManyArgs;
    return this.venderTypeRepo.findByCondition(Condition);
  }
  findFirst(id: number) {
    return this.venderTypeRepo.findOneByCondition({ where: { id } });
  }

  async update(id: number, data: Prisma.venderTypeUpdateInput) {
    return this.venderTypeRepo.update({ where: { id }, data: data });
  }
  async delete(id: number) {
    return this.venderTypeRepo.delete({ where: { id } });
  }
}
