import { Injectable } from '@nestjs/common';
import { ContactRepository, VenderGroupRepository } from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class VenderGroupService {
  constructor(
    private venderGroupRepo: VenderGroupRepository,
    private contactRepo: ContactRepository,
  ) {}
  create(data: Prisma.venderGroupCreateInput) {
    const condition = { data: data } as Prisma.venderGroupCreateArgs;
    return this.venderGroupRepo.create(condition);
  }

  createContact(data: Prisma.contactCreateManyInput[]) {
    return this.contactRepo.createContact({ data: data });
  }

  findAll() {
    return this.venderGroupRepo.findAll({ orderBy: { id: 'desc' } });
  }
  count() {
    const condition = {} as Prisma.venderGroupCountArgs;

    return this.venderGroupRepo.count(condition);
  }
  findMany(condition: Prisma.venderGroupFindManyArgs) {
    const Condition = {
      ...condition,
      include: {
        contact: true,
      },
      orderBy: { id: 'asc' },
    } as Prisma.venderGroupFindManyArgs;
    return this.venderGroupRepo.findByCondition(Condition);
  }
  findFirst(id: number) {
    return this.venderGroupRepo.findOneByCondition({ where: { id } });
  }

  async update(id: number, data: Prisma.venderGroupUpdateInput) {
    return this.venderGroupRepo.update({ where: { id }, data: data });
  }
  async delete(id: number) {
    return this.venderGroupRepo.delete({ where: { id } });
  }
}
