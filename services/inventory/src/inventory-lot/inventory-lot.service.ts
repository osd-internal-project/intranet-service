import { Injectable, Logger } from '@nestjs/common';
import {
  InventoryLotRepository,
  InventoryRepository,
  FileRecieveStockRepository,
} from '@inventory/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryLotService {
  constructor(
    private inventoryLotRepo: InventoryLotRepository,
    private fileRecieveStockRepo: FileRecieveStockRepository,
    private inventoryRepo: InventoryRepository,
  ) {}

  create(data: Prisma.inventoryLotCreateInput) {
    const condition = { data: data } as Prisma.inventoryLotCreateArgs;
    return this.inventoryLotRepo.create(condition);
  }

  findAll() {
    return this.inventoryLotRepo.findAll();
  }

  findMany(condition: Prisma.inventoryLotFindManyArgs) {
    return this.inventoryLotRepo.findMany(condition);
  }

  findOne(condition: Prisma.inventoryLotFindFirstArgs) {
    return this.inventoryLotRepo.findOne(condition);
  }

  async update(id: number, data: Prisma.inventoryLotUpdateInput) {
    const condition = {
      where: { id: id },
      data: data,
    } as Prisma.inventoryLotUpdateArgs;
    return await this.inventoryLotRepo.update(condition);
  }

  async remove(id: number) {
    const condition = { where: { id: id } } as Prisma.inventoryLotDeleteArgs;
    return await this.inventoryLotRepo.delete(condition);
  }

  async findRemainOfStockUsable(inventoryStockId: number) {
    const condition = {
      where: {
        inventoryStockId: inventoryStockId,
        expiryDate: { gt: new Date() },
        remain: { gt: 0 },
      },
      _sum: { remain: true },
    } as Prisma.InventoryLotAggregateArgs;
    const data = await this.inventoryLotRepo.aggregate(condition);
    const summary = data._sum.remain ? data._sum.remain : 0;
    return summary;
  }
  async findRemainOfStockExpired(inventoryStockId: number) {
    const condition = {
      where: {
        inventoryStockId: inventoryStockId,
        expiryDate: { lte: new Date() },
        remain: { gt: 0 },
      },
      _sum: { remain: true },
    } as Prisma.InventoryLotAggregateArgs;
    const data = await this.inventoryLotRepo.aggregate(condition);
    const summary = data._sum.remain ? data._sum.remain : 0;
    return summary;
  }

  findByInventoryID(
    inventoryId: number,
    expiredStatus: boolean,
    difLotId: number[],
    condition: any,
  ) {
    const { casNo, masterProductDetails, masterProductGroupId } = condition;
    let chkExpiredDate = {};
    if (expiredStatus === true) {
      chkExpiredDate = { lte: new Date() };
    } else {
      chkExpiredDate = { gt: new Date() };
    }
    condition = {
      where: {
        id: {
          not: { in: difLotId },
        },
        expiryDate: chkExpiredDate,
        inventoryStock: {
          inventoryId: Number(inventoryId),
          masterProduct: {
            ...(casNo && {
              casNo: casNo,
            }),
            ...(masterProductDetails && {
              masterProductDetails: masterProductDetails,
            }),
            ...(masterProductGroupId && {
              masterProductGroupId: masterProductGroupId,
            }),
          },
        },
      },
      select: {
        id: true,
        lotNo: true,
        detail: true,
        brandName: true,
        venderName: true,
        inventoryStock: {
          select: {
            id: true,
            masterProduct: {
              select: {
                masterProductDetails: true,
                casNo: true,
                unit: { select: { unitName: true } },
                masterProductGroup: { select: { id: true, groupName: true } },
                chemicalFormula: true,
              },
            },
          },
        },
        expiryDate: true,
        remain: true,
        price: true,
        qty: true,
      },
    } as Prisma.inventoryLotFindManyArgs;
    console.log(condition);

    return this.inventoryLotRepo.findMany(condition);
  }

  async findBeforeExpired(departmentIdList: number[]) {
    const inventoryList = await this.inventoryRepo.findMany({
      where: { locationId: { in: departmentIdList } },
    });
    const inventoryIdList = inventoryList.map((inv) => inv.id);
    const condition = {
      where: {
        remain: { gte: 0 },
        notiExpiryDate: { lte: new Date() },
        notiExpiryStatus: true,
        inventoryStock: { inventoryId: { in: inventoryIdList } },
      },
      select: {
        notiExpiryDate: true,
        notiExpiryStatus: true,
        inventoryStock: {
          select: {
            masterProduct: {
              select: {
                casNo: true,
                masterProductDetails: true,
                unit: { select: { unitName: true } },
              },
            },
            inventory: {
              select: {
                inventoryName: true,
                location: { select: { locationName: true } },
              },
            },
          },
        },
        lotNo: true,
        expiryDate: true,
        remain: true,
      },
    } as Prisma.inventoryLotFindManyArgs;
    const data = await this.inventoryLotRepo.findMany(condition);

    return data;
  }
  async countBeforeExpired(group: string[]) {
    const condition = {
      where: {
        remain: { gte: 0 },
        notiExpiryDate: { lte: new Date() },
        notiExpiryStatus: true,
        inventoryStock: {
          inventory: {
            location: {
              locationUserGroupMap: { some: { userGroupId: { in: group } } },
            },
          },
        },
      },
    } as Prisma.inventoryLotCountArgs;
    const data = await this.inventoryLotRepo.count(condition);
    console.log(data);
    return data;
  }

  findFileByRecieveFileId(id: number) {
    return this.fileRecieveStockRepo.findOne({ where: { id: id } });
  }
}
