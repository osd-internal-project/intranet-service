import { Injectable } from '@nestjs/common';
import { InventoryRepository } from '@inventory/share';
import { Prisma, inventory } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private inventoryRepo: InventoryRepository) {}

  create(data: Prisma.inventoryCreateInput) {
    const condition = { data: data } as Prisma.inventoryCreateArgs;
    return this.inventoryRepo.create(condition);
  }

  findAll() {
    const condition = {
      orderBy: { id: 'asc' },
    } as Prisma.inventoryFindManyArgs;
    return this.inventoryRepo.findAll(condition);
  }

  findMany(condition: Prisma.inventoryFindManyArgs) {
    const data = {
      ...condition,
      orderBy: { id: 'asc' },
    } as Prisma.inventoryFindManyArgs;
    return this.inventoryRepo.findMany(data);
  }

  count(condition: Prisma.inventoryFindManyArgs) {
    const filter = {
      ...condition,
      where: {
        status: true,
      },
    } as Prisma.inventoryCountArgs;
    return this.inventoryRepo.count(filter);
  }

  findNotOwner(locationId: number) {
    return this.inventoryRepo.findMany({
      where: {
        status: true,
        OR: [{ locationId: null }, { locationId: locationId }],
      },
      orderBy: { id: 'asc' },
    });
  }

  async findByUserGroup(userGroup: string[], search: object) {
    console.log(userGroup);
    const condition = {
      where: {
        ...search,
        location: {
          status: true,
          locationUserGroupMap: {
            some: { userGroupId: { in: userGroup } },
          },
        },
        status: true,
      },
      include: { location: true },
      orderBy: { id: 'asc' },
    } as Prisma.inventoryFindManyArgs;

    return await this.inventoryRepo.findMany(condition);
  }

  async update(id: number, data: Prisma.inventoryUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.inventoryUpdateArgs;
    return await this.inventoryRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.inventoryDeleteArgs;
    return await this.inventoryRepo.delete(condition);
  }
}
